export type BounceDirection = 'top' | 'left' | 'bottom' | 'right'

export type PartialCSSStyle = Partial<CSSStyleDeclaration>

export interface BounceAnimation {
  name: string
  duration: number
  delay?: number
  functionName?: CSSStyleDeclaration['animationTimingFunction']
}
