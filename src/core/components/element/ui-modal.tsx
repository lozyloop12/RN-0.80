import { ReactChildren } from '@src/core/constants';
import React, { FC, memo } from 'react';
import {
  Modal,
  ModalProps,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, horizontalScale, verticalScale } from '../../utils';

type ModalAppProps = {
  visible: boolean;
  animationType?: ModalProps['animationType'];
  onHideModal?: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  children?: ReactChildren;
};

const UIModal: FC<ModalAppProps> = memo((props) => {
  const {
    visible,
    animationType = 'fade',
    children,
    styleContainer = {},
    styleContent = {},
    onHideModal = () => {},
  } = props;

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent
      statusBarTranslucent
      onRequestClose={onHideModal}
    >
      <Pressable
        style={[styles.container, styleContainer]}
        onPress={onHideModal}
      >
        <Pressable style={[styles.content, styleContent]}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default UIModal;

export type { ModalAppProps };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.rgba000000_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: horizontalScale(335),
    minHeight: verticalScale(168),
    backgroundColor: Colors.hFFFFFF,
    borderRadius: horizontalScale(10),
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
