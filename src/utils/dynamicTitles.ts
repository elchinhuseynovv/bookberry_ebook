import { useTranslation } from 'react-i18next';

export const useDynamicTitles = () => {
  const { t, i18n } = useTranslation();

  const getLogoutTitle = () => {
    switch (i18n.language) {
      case 'az':
        return 'Çıxış';
      case 'ru':
        return 'Выход';
      default:
        return 'Logout';
    }
  };

  const getResetPasswordTitle = () => {
    switch (i18n.language) {
      case 'az':
        return 'Şifrəni sıfırla';
      case 'ru':
        return 'Сброс пароля';
      default:
        return 'Reset Password';
    }
  };

  const getSupportTitle = () => {
    switch (i18n.language) {
      case 'az':
        return 'Dəstək';
      case 'ru':
        return 'Поддержка';
      default:
        return 'Support';
    }
  };

  return {
    getLogoutTitle,
    getResetPasswordTitle,
    getSupportTitle
  };
};