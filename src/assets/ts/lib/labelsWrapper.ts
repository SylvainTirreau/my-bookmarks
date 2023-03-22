import { domElements } from './domElements'

export function showHideLabelsWrapper (): void {
  const wrapper = domElements.get('labelsWrapper')
  const btn = domElements.get('labelsBtn')
  if (wrapper != null && btn != null) {
    const chevrons = btn.getElementsByTagName('svg')
    if (btn.dataset.state === 'fold') {
      btn.dataset.state = 'unfold'
      wrapper.style.top = `calc(100% - ${wrapper?.offsetHeight.toString() ?? '0'}px)`
      for (const chevron of chevrons) {
        chevron.classList.add('unfold')
      }
    } else if (domElements.get('labelsBtn')?.dataset.state === 'unfold') {
      btn.dataset.state = 'fold'
      wrapper.style.top = ''
      for (const chevron of chevrons) {
        chevron.classList.remove('unfold')
      }
    }
  }
}

export function setLabelsContainerBodyHeight (): void {
  const labelContainerBody = domElements.get('labelContainerBody')
  const labelsWrapper = domElements.get('labelsWrapper')
  const labelContainerTitle = domElements.get('labelContainerTitle')
  if (labelContainerBody != null && labelsWrapper != null && labelContainerTitle != null) {
    labelContainerBody.style.height = `${labelsWrapper.offsetHeight - labelContainerTitle.offsetHeight}px`
  }
}
