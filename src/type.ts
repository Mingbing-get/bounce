export type BounceDirection = 'top' | 'left' | 'bottom' | 'right'

export type PartialCSSStyle = Partial<CSSStyleDeclaration>

export interface BounceAnimation {
  name: string
  duration: number
  delay?: number
  timingFunction?: CSSStyleDeclaration['animationTimingFunction']
  iterationCount?: 'infinite' | number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'backward' | 'forwards' | 'none' | 'both'
}

export interface EachBounceAnimation {
  (index: number, el: Element): BounceAnimation[]
}
