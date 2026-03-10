import { _LanguageCode } from "../consts";

// Kiểm tra ngôn ngữ có hợp lệ hay không
export const checkLanguage = (lang: string) => {
  return [_LanguageCode.EN, _LanguageCode.VI].includes(lang as _LanguageCode);
};
