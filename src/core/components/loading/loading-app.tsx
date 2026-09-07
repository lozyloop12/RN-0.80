import { useLoadingStore } from '@src/app/stores';
import { Colors, horizontalScale } from '@src/core/utils';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingApp = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.hFFFFFF} />
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.rgba000000_50,
  },
  loading: {
    width: horizontalScale(140),
    height: horizontalScale(70),
    backgroundColor: Colors.h1B1816,
    borderRadius: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingApp;
