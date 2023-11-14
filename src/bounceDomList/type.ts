import { BounceAnimation, EachBounceAnimation } from '../type'

export interface BounceDomListOption {
  delay?: number
  keepLastAnimation?: boolean
  animations: BounceAnimation[] | EachBounceAnimation
}
