import { domElements } from './domElements'
import { i18nText } from './lang'

export function loadWaitingScreen (this: HTMLElement): void {
  const waitingScreen = domElements.get('waitingScreen')
  const waitingText = domElements.get('waitingText')
  if ('textProgressOnClick' in this.dataset) {
    const i18nId = (this.dataset.textProgressOnClick !== undefined) ? this.dataset.textProgressOnClick : 'i18n-lang-not-define'
    if (waitingText != null) waitingText.innerText = i18nText(i18nId)
  }
  if (waitingScreen != null) waitingScreen.classList.remove('hide')
}
