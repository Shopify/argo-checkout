export interface LocaleApi {
  locale: {
    initialValue: string;
    setOnChange(onChange: (locale: string) => void);
  };
}

export function isLocaleApi(api: any): api is LocaleApi {
  return 'locale' in api;
}
