import { BounceAnimation } from '../type'

export interface BounceQuerySelectorOption {
  delay?: number
  keepLastAnimation?: boolean
  animations: BounceAnimation[] | ((index: number, el: Element) => BounceAnimation[])
}
