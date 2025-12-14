type LanguageKey =
  | 'cn'
  | 'zh'
  | 'en'
  | 'ru'
  | 'pt'
  | 'pl'
  | 'no'
  | 'nl'
  | 'ko'
  | 'ja'
  | 'it'
  | 'fr'
  | 'fi'
  | 'es'
  | 'gr'
  | 'de'
  | 'da'
  | 'cz'
  | 'id'
  | 'he'
  | 'sh'
  | 'hi'
  | 'vi'
  | 'tl'
  | 'ar'
  | 'ta'
  | 'mr'
  | 'tr'
  | 'fa'
  | 'ml'
  | 'lt'
  | 'th'
  | 'bn'
  | 'ne'
  | 'hu'
  | 'sv'
  | 'ms'
  | 'sr'
  | 'te'

const lang: Record<LanguageKey, string> = {
  cn: 'Китайский',
  zh: 'Китайский',
  en: 'Английский',
  ru: 'Русский',
  pt: 'Португальский',
  pl: 'Польский',
  no: 'Норвежский',
  nl: 'Голландский',
  ko: 'Корейский',
  ja: 'Японский',
  it: 'Итальянский',
  fr: 'Французский',
  fi: 'Финский',
  es: 'Испанский',
  gr: 'Греческий',
  de: 'Немецкий',
  da: 'Датский',
  cz: 'Чешский',
  id: 'Индонезийский',
  he: 'Еврейский',
  sh: 'сербско-хорватский',
  hi: 'Хинди',
  vi: 'Вьетнамский',
  tl: 'Тагальский',
  ar: 'Арабский',
  ta: 'Татарский',
  mr: 'Маратхи',
  tr: 'Турецкий',
  fa: 'Персидский',
  ml: 'Малаялам',
  lt: 'Литовский',
  th: 'Тайский',
  bn: 'Бенгальский',
  ne: 'Непальский',
  hu: 'Венгерский',
  sv: 'Шведский',
  ms: 'Малайский',
  sr: 'Сербский',
  te: 'Телугу',
}

function isLanguageKey(key: string): key is LanguageKey {
  return key in lang
}

export function getLanguageName(code: string): string {
  if (!isLanguageKey(code)) {
    return `Код языка: ${code}`
  }
  return lang[code]
}
