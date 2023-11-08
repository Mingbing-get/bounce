import { PartialCSSStyle } from './type'

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
