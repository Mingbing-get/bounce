import { BounceAnimation } from '../type'

export interface BounceQuerySelectorOption {
  delay?: number
  animations: BounceAnimation[] | ((index: number, el: Element) => BounceAnimation[])
}
