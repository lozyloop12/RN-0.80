import {
  ButtonPrimary,
  ContainerMain,
  fontSize,
  horizontalScale,
  UIImage,
  UILabel,
  useGetProfile,
  verticalScale,
} from '@src/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomePage = () => {
  const { data, refetch, isFetching } = useGetProfile();


  return (
    <ContainerMain headerShow title="Home">
      <View style={styles.container}>
        <UIImage
          style={styles.bannerImage}
          source={{
            uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
          }}
        />
        <UILabel value="React Native 0.87 Architecture" style={styles.title} />
        <UILabel
          value={data ? `Profile loaded: ${JSON.stringify(data).slice(0, 50)}...` : 'Welcome to the updated DU Base!'}
          style={styles.subtitle}
        />
        <ButtonPrimary
          label={isFetching ? 'Fetching...' : 'Refetch Profile'}
          onPress={() => refetch()}
          loading={isFetching}
          style={styles.button}
        />
      </View>
    </ContainerMain>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  bannerImage: {
    width: horizontalScale(280),
    height: verticalScale(140),
    borderRadius: horizontalScale(12),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize(14),
    textAlign: 'center',
    marginBottom: verticalScale(24),
  },
  button: {
    width: '100%',
  },
});
