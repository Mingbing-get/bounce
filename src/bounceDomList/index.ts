import { BounceDomListOption } from './type'
import { sleep, isFunction, addStyle, removeStyle, animationToString } from '../utils'

export default async function bounceDomList(domList: Element[], option: BounceDomListOption) {
  const { animations, delay, keepLastAnimation } = option

  if (delay) {
    await sleep(delay)
  }

  const promiseList: Promise<any>[] = []
  for (let i = 0; i < domList.length; i++) {
    const factAnimations = isFunction(animations) ? animations(i, domList[i]) : animations

    promiseList.push(
      (async () => {
        for (const animation of factAnimations) {
          if (animation.delay) {
            await sleep(animation.delay)
          }

          addStyle(domList[i], {
            animation: animationToString(animation),
          })
          await sleep(animation.duration)
        }

        if (!keepLastAnimation) {
          removeStyle(domList[i], ['animation'])
        }
      })()
    )
  }

  await Promise.all(promiseList)
}
