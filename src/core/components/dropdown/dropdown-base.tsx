import {
  Colors,
  fontSize,
  horizontalScale,
  isIOS,
  verticalScale,
} from '@src/core/utils';
import React, { useEffect, useRef, useState } from 'react';
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

export interface DropDownBaseProps<T = any> {
  container?: StyleProp<ViewStyle>;
  label?: string;
  placeholder?: string;
  onSelectItem: (data: T) => void;
  title?: string;
  data: Array<T>;
  dropdownStyle?: StyleProp<ViewStyle>;
  styleBtn?: StyleProp<ViewStyle>;
  labelKey?: string;
  valueKey?: string;
  renderCustomItem?: (item: T, isSelected: boolean) => React.ReactNode;
}

const DropDownBase = <T = any>(props: DropDownBaseProps<T>) => {
  const {
    container = {},
    label = '',
    placeholder = 'Select an option',
    onSelectItem,
    title = '',
    data = [],
    dropdownStyle = {},
    styleBtn = {},
    labelKey,
    valueKey,
    renderCustomItem,
  } = props;
  const [isShowDropDown, setShowDropDown] = useState(false);
  const dropdownButtonRef = useRef<any>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [value, setValue] = useState<T[]>(data || []);
  const [labelDropdown, setLabel] = useState(label || '');
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const insets = useSafeAreaInsets();
  const heightSatusbar = insets.top;

  // Sync value when dynamic data updates (e.g. from API)
  useEffect(() => {
    setValue(data || []);
  }, [data]);

  // Sync label when prop changes
  useEffect(() => {
    if (label !== undefined) {
      setLabel(label);
    }
  }, [label]);

  const getItemLabel = (item: any): string => {
    if (!item) return '';
    if (labelKey && item[labelKey] !== undefined) {
      return String(item[labelKey]);
    }
    if (item.name !== undefined) return String(item.name);
    if (item.title !== undefined) return String(item.title);
    if (item.label !== undefined) return String(item.label);
    if (typeof item === 'string') return item;
    return String(item);
  };

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
          w: number,
          h: number,
          px: number,
          py: number,
        ) => {
          isIOS
            ? setDropdownTop(py + h)
            : setDropdownTop(py + h - heightSatusbar);
          setDropdownLeft(px);
          setDropdownWidth(w);
        },
      );
      setShowDropDown(true);
    }
  };

  const onSelect = (item: T, index: number) => {
    const newValues = value.map((v: any, i: number) => {
      if (i === index) return { ...v, selected: true };
      return { ...v, selected: false };
    });
    setValue(newValues);
    setSelectedItem(item);
    setShowDropDown(!isShowDropDown);
    onSelectItem(item);
    setLabel(getItemLabel(item));
  };

  const renderItem = ({ item, index }: { item: T; index: number }) => {
    const itemLabel = getItemLabel(item);
    const isSelected =
      valueKey && selectedItem
        ? (selectedItem as any)[valueKey] === (item as any)[valueKey]
        : (item as any).selected || itemLabel === labelDropdown;
    const isLastItem = (value?.length || 0) - 1 === index;
    const borderBottomWidth = isLastItem ? 0 : verticalScale(1);

    if (renderCustomItem) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.viewItem, { borderBottomWidth }]}
          onPress={() => onSelect(item, index)}
        >
          {renderCustomItem(item, isSelected)}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.viewItem,
          { borderBottomWidth },
          isSelected && styles.viewItemSelected,
        ]}
        onPress={() => onSelect(item, index)}
      >
        <Text
          numberOfLines={1}
          style={[styles.itemText, isSelected && styles.itemTextSelected]}
        >
          {itemLabel}
        </Text>
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
                {
                  top: dropdownTop,
                  ...(dropdownLeft ? { left: dropdownLeft } : {}),
                  ...(dropdownWidth ? { width: dropdownWidth } : {}),
                },
              ]}
            >
              <FlatList
                data={value}
                renderItem={renderItem}
                keyExtractor={(item: any, index: number) =>
                  valueKey && item[valueKey] !== undefined
                    ? String(item[valueKey])
                    : item.id !== undefined
                      ? String(item.id)
                      : index.toString()
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No data available</Text>
                  </View>
                }
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
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            !labelDropdown && styles.placeholder,
          ]}
        >
          {labelDropdown || placeholder}
        </Text>
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
    flex: 1,
  },
  placeholder: {
    color: Colors.h848D9A,
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
    minHeight: verticalScale(60),
    maxHeight: verticalScale(220),
  },
  viewItem: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(12),
    borderColor: Colors.hE3E3E3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewItemSelected: {
    backgroundColor: Colors.hF5F5F5,
  },
  itemText: {
    fontSize: fontSize(14),
    color: Colors.h151515,
    flex: 1,
  },
  itemTextSelected: {
    fontWeight: '600',
    color: Colors.h29835A,
  },
  emptyContainer: {
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: fontSize(14),
    color: Colors.h848D9A,
  },
});
