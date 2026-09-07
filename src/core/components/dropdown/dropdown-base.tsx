import {
  Colors,
  fontSize,
  horizontalScale,
  isIOS,
  verticalScale,
} from '@src/core/utils';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  container?: ViewStyle;
  label?: string;
  onSelectItem: (data: any) => void;
  title?: string;
  data: Array<any>;
  dropdownStyle?: StyleProp<ViewStyle>;
  styleBtn?: ViewStyle;
}

const DropDownBase = (props: IProps) => {
  const {
    container = {},
    label = '',
    onSelectItem,
    title = '',
    data = [],
    dropdownStyle = {},
    styleBtn = {},
  } = props;
  const [isShowDropDown, setShowDropDown] = useState(false);
  const dropdownButtonRef = useRef<any>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [value, setValue] = useState(data || []);
  const [labelDropdown, setLabel] = useState(label || '');
  const insets = useSafeAreaInsets();
  const heightSatusbar = insets.top;

  const onCloseDropDown = () => {
    setShowDropDown(!isShowDropDown);
  };

  const onPressModal = () => {
    setShowDropDown(!isShowDropDown);
  };

  const openDropdown = () => {
    if (dropdownButtonRef && dropdownButtonRef.current) {
      dropdownButtonRef.current.measure(
        (
          _fx: number,
          _fy: number,
          _w: number,
          h: number,
          _px: number,
          py: number,
        ) => {
          isIOS
            ? setDropdownTop(py + h)
            : setDropdownTop(py + h - heightSatusbar);
        },
      );
      setShowDropDown(true);
    }
  };

  const onSelect = (item: any, index: number) => {
    const newValues = value.map((v: any, i: number) => {
      if (i === index) return { ...v, selected: true };
      return { ...v, selected: false };
    });
    setValue(newValues);
    setShowDropDown(!isShowDropDown);
    onSelectItem(item);
    setLabel(item.name);
  };

  const renderItem = ({ item, index }: any) => {
    const { name } = item;
    const isLastItem = data.length - 1 === index;
    const borderBottomWidth = isLastItem ? 0 : verticalScale(1);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.viewItem, { borderBottomWidth }]}
        onPress={() => onSelect(item, index)}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderViewModal = () => {
    return (
      <Modal
        animationType="fade"
        visible={isShowDropDown}
        transparent
        onRequestClose={onCloseDropDown}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
      >
        <TouchableWithoutFeedback onPress={onPressModal}>
          <View style={styles.modal}>
            <View
              style={[
                styles.dropdown,
                dropdownStyle,
                { top: dropdownTop },
              ]}
            >
              <FlatList
                data={value}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={[styles.viewContainer, container]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        ref={dropdownButtonRef as any}
        onPress={openDropdown}
        style={[styles.btn, styleBtn]}
      >
        <Text style={[styles.label]}>{labelDropdown}</Text>
      </TouchableOpacity>
      {renderViewModal()}
    </View>
  );
};

export default DropDownBase;

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
  },
  btn: {
    width: '100%',
    borderRadius: horizontalScale(24),
    backgroundColor: Colors.hF5F5F5,
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.hE3E3E3,
    paddingHorizontal: horizontalScale(18),
  },
  label: {
    fontSize: fontSize(16),
    color: Colors.h151515,
  },
  title: {
    fontSize: fontSize(15),
    color: Colors.h656565,
    marginBottom: horizontalScale(4),
  },
  modal: {
    flex: 1,
    flexGrow: 1,
  },
  dropdown: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    justifyContent: 'center',
    borderRadius: horizontalScale(8),
    backgroundColor: Colors.hFFFFFF,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.107,
    shadowRadius: 4,
    elevation: 2,
    minHeight: verticalScale(100),
    maxHeight: verticalScale(200),
  },
  viewItem: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(15),
    borderColor: Colors.hFFFFFF,
    marginTop: verticalScale(10),
    justifyContent: 'space-between',
  },
});
