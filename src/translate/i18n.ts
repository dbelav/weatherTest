import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          Wind: 'Wind',
          Humidity: 'Humidity',
          Pressure: 'Pressure',
          Feels: 'Feels like',
          Add: 'Add',
          Search: 'Search'
        },
      },
      ua: {
        translation: {
          Wind: 'Вітер',
          Humidity: 'Вологість',
          Pressure: 'Тиск',
          Feels: 'Відчувається як',
          Add: 'Додати',
          Search: 'Пошук'
        },
      },
      he: {
        translation: {
          Wind: 'רוּחַ',
          Humidity: 'לחות',
          Pressure: 'לַחַץ',
          Feels: 'מרגיש כמו',
          Add: 'לְהוֹסִיף',
          Search: 'לחפש'
        },
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;