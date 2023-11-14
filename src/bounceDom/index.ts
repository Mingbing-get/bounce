import { BounceDomOption } from './type'
import { sleep, addStyle, removeStyle, animationToString } from '../utils'

export default async function bounceDom(dom: HTMLElement, option: BounceDomOption) {
  const { animations, delay, keepLastAnimation } = option

  if (delay) {
    await sleep(delay)
  }

  for (const animation of animations) {
    if (animation.delay) {
      await sleep(animation.delay)
    }

    addStyle(dom, {
      animation: animationToString(animation),
    })
    await sleep(animation.duration)
  }

  if (!keepLastAnimation) {
    removeStyle(dom, ['animation'])
  }
}
