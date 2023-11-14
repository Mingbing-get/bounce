import { PartialCSSStyle, BounceAnimation } from './type'

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function addStyle(dom: Element, style: PartialCSSStyle) {
  const oldStyle = dom.getAttribute('style')

  const newStyleObject = {
    ...styleStringToStyleObject(oldStyle || ''),
    ...style,
  }

  dom.setAttribute('style', styleObjectToStyleString(newStyleObject))
}

export function removeStyle(dom: Element, keys: (keyof PartialCSSStyle)[]) {
  const oldStyleObject = styleStringToStyleObject(dom.getAttribute('style') || '')

  keys.forEach((key) => delete oldStyleObject[key])

  dom.setAttribute('style', styleObjectToStyleString(oldStyleObject))
}

export function styleStringToStyleObject(styleStr: string) {
  const res: PartialCSSStyle = {}
  if (!styleStr) return res

  const splitStyle = styleStr.split(';')
  splitStyle.forEach((item) => {
    const single = item.split(':')
    if (single.length < 2) return

    res[single[0].trim()] = single.slice(1).join(':')
  })

  return res
}

export function styleObjectToStyleString(styleObject: PartialCSSStyle) {
  const res: string[] = []

  for (const key in styleObject) {
    res.push(`${key}: ${styleObject[key]}`)
  }

  return res.join(';')
}

export function isFunction(v: any): v is Function {
  return typeof v === 'function'
}

export function animationToString(animation: BounceAnimation) {
  const animationPros: string[] = [animation.name, `${animation.duration / 1000}s`, animation.timingFunction || 'linear']

  if (animation.delay) {
    animationPros.push(`${animation.delay / 1000}s`)
  }

  if (animation.iterationCount) {
    animationPros.push(`${animation.iterationCount}`)
  }

  if (animation.direction) {
    animationPros.push(animation.direction)
  }

  if (animation.fillMode) {
    animationPros.push(animation.fillMode)
  }

  return animationPros.join(' ')
}
