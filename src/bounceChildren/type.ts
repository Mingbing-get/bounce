import { BounceAnimation } from '../type'

export interface BounceChildrenOption {
  delay?: number
  keepLastAnimation?: boolean
  animations: BounceAnimation[] | ((index: number, child: Element) => BounceAnimation[])
}
