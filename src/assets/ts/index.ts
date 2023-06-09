import { domElements } from './lib/domElements'
import { loadWaitingScreen } from './lib/waitingScreens'
import { showHideSettingsMenu } from './lib/settingsMenu'
import { insertSlugifiedLabelInFormFromKeyboardInput } from './lib/labelForm'
import { setLabelsContainerBodyHeight, showHideLabelsWrapper } from './lib/labelsWrapper'

// Settings menu event listeners
domElements.get('settingsBtn')?.addEventListener('click', showHideSettingsMenu)

// Show and hide labels wrapper
if ((domElements.get('labelsWrapper')?.classList.contains('hide')) === false) {
  domElements.get('labelsBtn')?.addEventListener('click', showHideLabelsWrapper)
}

// "Add link" page
if (document.body.dataset.id === 'settings-links') domElements.get('addLinkSubmitBtn')?.addEventListener('click', loadWaitingScreen)

// "Add label" page
if (document.body.dataset.id === 'settings-labels' || document.body.dataset.id === 'modify-label') {
  domElements.get('labelName')?.addEventListener('keyup', insertSlugifiedLabelInFormFromKeyboardInput)
  setLabelsContainerBodyHeight()
}

// Add waiting screen event listener
document.querySelectorAll('[data-progress-on-click]').forEach((element) => {
  if ((element as HTMLElement).dataset.progressOnClick === 'true') {
    element.addEventListener('click', loadWaitingScreen)
  }
})
