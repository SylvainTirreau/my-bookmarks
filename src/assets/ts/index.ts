import { domElements } from './lib/domElements'
import { loadWaitingScreen } from './lib/waitingScreens'
import { showHideSettingsMenu } from './lib/settingsMenu'
import { insertSlugifiedLabelInFormFromKeyboardInput } from './lib/labelForm'

// Settings menu event listeners
domElements.get('settingsBtn')?.addEventListener('click', showHideSettingsMenu)

// Add link page
if (document.body.dataset.id === 'settings-links') domElements.get('addLinkSubmitBtn')?.addEventListener('click', loadWaitingScreen)

// Add label page
if (document.body.dataset.id === 'settings-labels') {
  domElements.get('addLabelSubmitBtn')?.addEventListener('click', loadWaitingScreen)
  domElements.get('labelName')?.addEventListener('keyup', insertSlugifiedLabelInFormFromKeyboardInput)
}
