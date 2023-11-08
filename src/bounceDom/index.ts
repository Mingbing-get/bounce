import { BounceDomOption } from './type'
import { sleep, addStyle, removeStyle } from '../utils'

export default async function bounceDom(dom: HTMLElement, option: BounceDomOption) {
  const { animations, delay } = option

  if (delay) {
    await sleep(delay)
  }

  for (const animation of animations) {
    if (animation.delay) {
      await sleep(animation.delay)
    }

    addStyle(dom, {
      animation: `${animation.name} ${animation.duration / 1000}s ${animation.functionName || 'linear'}`,
    })
    await sleep(animation.duration)
  }

  removeStyle(dom, ['animation'])
}
