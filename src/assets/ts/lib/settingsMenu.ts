import {domElements} from "./domElements";

export function showHideSettingsMenu() {
  console.log(this);
  (domElements.get('settingsSubmenu').classList.contains('visible')) ? domElements.get('settingsSubmenu').classList.remove('visible') : domElements.get('settingsSubmenu').classList.add('visible')
}