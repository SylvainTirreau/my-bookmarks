export const domElements = new Map<string, HTMLElement | null>([
  ['waitingScreen', document.getElementById('waiting-screen')],
  ['waitingText', document.getElementById('waiting-text')],
  ['addLinkSubmitBtn', document.getElementById('add-link')],
  ['labelsWrapper', document.getElementById('labels-wrapper')],
  ['settingsBtn', document.getElementById('settings-btn')],
  ['settingsSubmenu', document.getElementById('settings-submenu')]
])