import { BounceQuerySelectorOption } from './type'
import { sleep, isFunction, addStyle, removeStyle } from '../utils'

export default async function BounceQuerySelector(selector: string, option: BounceQuerySelectorOption) {
  const { animations, delay } = option

  if (delay) {
    await sleep(delay)
  }

  const promiseList: Promise<any>[] = []
  const children = document.querySelectorAll(selector)
  for (let i = 0; i < children.length; i++) {
    const factAnimations = isFunction(animations) ? animations(i, children[i]) : animations

    promiseList.push(
      (async () => {
        for (const animation of factAnimations) {
          if (animation.delay) {
            await sleep(animation.delay)
          }

          addStyle(children[i], {
            animation: `${animation.name} ${animation.duration / 1000}s ${animation.functionName || 'linear'}`,
          })
          await sleep(animation.duration)
        }

        removeStyle(children[i], ['animation'])
      })()
    )
  }

  await Promise.all(promiseList)
}
