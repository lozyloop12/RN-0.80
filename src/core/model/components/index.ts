import {
  ImageProps,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from 'react-native';

export interface TextInputProps {
  styleTextInput?: object;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
}

export interface FormInputProps extends TextInputProps, Partial<ImageProps> {
  isShowButton?: boolean;
  style?: object;
  styleViewInput?: object;
  label?: string;
  imageSvg?: React.ReactNode;
  onPressButton?: () => void;
}

export interface TextProps {
  value?: string;
  style?: any;
  numberOfLines?: number;
}

export interface ButtonProps {
  title?: string;
  styleTitle?: any;
  styleButton?: any;
  onPressButton: () => void;
}
