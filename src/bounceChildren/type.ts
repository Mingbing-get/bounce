import { BounceAnimation } from '../type'

export interface BounceChildrenOption {
  delay?: number
  animations: BounceAnimation[] | ((index: number, child: Element) => BounceAnimation[])
}
