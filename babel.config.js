module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          '@src/app': './src/app',
          '@src/core': './src/core',
          '@src/library': './src/library',
          '@src/modules': './src/modules',
          '@modules': './src/modules',
          '@src/assets': './src/assets',
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
