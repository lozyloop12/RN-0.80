import { LoadingApp } from '@src/core/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigation from './navigation';
import { Screen, TypeNameScreen } from './navigation/app-route-type';

const App = () => {
  const [initialRouteName] = useState<TypeNameScreen>(Screen.Home);

  return (
    <View style={styles.container}>
      <AppNavigation initialRouteName={initialRouteName} />
      <LoadingApp />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
