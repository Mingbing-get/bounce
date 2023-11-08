import { BounceTextOptions } from './type'
import { BounceAnimation } from '../type'
import { sleep } from '../utils'

export default async function bounceText(dom: HTMLElement, option: BounceTextOptions) {
  const { executeSpace = 100, animations, delay } = option

  if (delay) {
    await sleep(delay)
  }

  const text = dom.innerText
  dom.innerText = ''
  const textList = splitTextMergeSpace(text)

  const promiseList: Promise<any>[] = []
  textList.forEach((w, i) => {
    promiseList.push(executeSingleWord(w, i * executeSpace, animations, dom))
  })

  await Promise.all(promiseList)
  dom.innerText = text
}

function splitTextMergeSpace(text: string) {
  let preSpace = 0

  return text.split('').reduce((total: string[], w) => {
    if (w === ' ') {
      preSpace += 1
    } else if (preSpace > 0) {
      total.push(`${new Array(preSpace).fill('&nbsp')}${w}`)
      preSpace = 0
    } else {
      total.push(w)
    }

    return total
  }, [])
}

async function executeSingleWord(w: string, delay: number, animations: BounceAnimation[], container: HTMLElement) {
  await sleep(delay)

  const span = document.createElement('span')
  span.innerHTML = w
  container.appendChild(span)

  for (const animation of animations) {
    if (animation.delay) {
      await sleep(animation.delay)
    }

    span.setAttribute('style', `animation: ${animation.name} ${animation.duration / 1000}s ${animation.functionName || 'linear'}; display: inline-block;`)
    await sleep(animation.duration)
  }
}
