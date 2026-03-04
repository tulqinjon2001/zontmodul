import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: typeof localStorage !== 'undefined' ? localStorage.getItem('i18n_lng') || 'uz' : 'uz',
  fallbackLng: 'uz',
  supportedLngs: ['uz', 'ru'],
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  if (typeof localStorage !== 'undefined') localStorage.setItem('i18n_lng', lng);
});

export default i18n;
