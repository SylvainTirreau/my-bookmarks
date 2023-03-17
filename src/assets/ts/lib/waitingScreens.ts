import {domElements} from "./domElements";

const waitingTexts = new Map<string, string>([
  ['add-link', 'Ajout du lien en cours (récupération de la page et des infos, réalisation de la capture écran, etc.)... ']
])

export function loadWaitingScreen(): void {
  const waitingScreen = domElements.get('waitingScreen')
  const waitingText = domElements.get('waitingText')

  waitingText.innerText = <string>waitingTexts.get(this.id)
  waitingScreen.classList.remove('hide')

}