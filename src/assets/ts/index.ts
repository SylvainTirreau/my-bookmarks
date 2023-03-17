import { domElements } from "./lib/domElements";
import { loadWaitingScreen } from "./lib/waitingScreens";
import { showHideSettingsMenu } from "./lib/settingsMenu";

// Settings menu event listeners
domElements.get('settingsBtn').addEventListener('click', showHideSettingsMenu)

if (document.body.dataset.id == "settings-links") domElements.get('addLinkSubmitBtn').addEventListener('click', loadWaitingScreen)