import { texts as textsFr } from '../../lang/i18n-fr'

const lang = new Map<string, Map<string, string>>([
  ['fr', textsFr]
])

export function i18nText(id: string, language = window.navigator.language.split('-')[0]): string {
  const langData = (lang.has(language)) ? lang.get(language) : null
  if ((langData?.has(id)) === true) return (langData.get(id) as string)
  return `"${id} is not defined yet."`
}
