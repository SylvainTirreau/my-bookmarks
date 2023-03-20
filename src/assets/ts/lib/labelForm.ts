import { domElements } from './domElements'
import { slugify } from './utils'

export function insertSlugifiedLabelInFormFromKeyboardInput (event: KeyboardEvent): void {
  const inputValue = (domElements.get('labelName') as HTMLInputElement).value;
  (domElements.get('labelSlug') as HTMLInputElement).value = slugify(inputValue)
}
