import { Colors } from '@src/core/utils';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImagePropsBase,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface ImageProps extends ImagePropsBase {
  source: ImageURISource | number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const UIImage: React.FC<ImageProps> = ({
  style,
  source,
  resizeMode = 'cover',
  containerStyle,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  // Handle empty or invalid source
  if (
    !source ||
    (typeof source === 'object' && 'uri' in source && !source.uri)
  ) {
    return <View />;
  }

  // Local image or non-http/https uri
  if (
    typeof source === 'number' ||
    !(
      source?.uri?.startsWith('http://') ||
      source?.uri?.startsWith('https://')
    )
  ) {
    return (
      <Image
        style={style}
        source={source}
        resizeMode={resizeMode}
        {...rest}
      />
    );
  }

  // Remote image with loading indicator
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={style}
        source={source}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
        resizeMode={resizeMode}
        {...rest}
      />
      {loading && (
        <ActivityIndicator
          size="small"
          style={styles.indicator}
          color={Colors.h000000}
        />
      )}
    </View>
  );
};

export default UIImage;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
  },
});
