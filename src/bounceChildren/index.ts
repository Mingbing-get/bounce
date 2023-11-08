import { BounceChildrenOption } from './type'
import { sleep, isFunction, addStyle, removeStyle } from '../utils'

export default async function BounceChildren(dom: HTMLElement, option: BounceChildrenOption) {
  const { animations, delay, keepLastAnimation } = option

  if (delay) {
    await sleep(delay)
  }

  const promiseList: Promise<any>[] = []
  const children = dom.children
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

        if (!keepLastAnimation) {
          removeStyle(children[i], ['animation'])
        }
      })()
    )
  }

  await Promise.all(promiseList)
}
