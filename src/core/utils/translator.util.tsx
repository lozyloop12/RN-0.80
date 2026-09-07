import I18n, { i18n, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

export class Translator {
  public static setup(options: InitOptions): i18n {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    I18n.use(initReactI18next).init(options);
    return I18n;
  }

  public static translate(message: string): string {
    return I18n.t(message) || message;
  }

  public static changeLanguages = (lng: string | undefined) => {
    if (lng) {
      I18n.changeLanguage(lng);
    }
  };
}
