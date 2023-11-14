import bounceText from '../src/bounceText'
import bounceManager from '../src/bounceManager'

export default function bounceTextExample() {
  const dom = document.createElement('div')

  dom.innerText = 'test dance text'
  dom.setAttribute('style', 'font-size: 30px; color: #e69; text-shadow: 4px 0 4px red; --bounce-translate-y: 20px;')

  bounceManager.append({
    trigger: 'click',
    triggerDom: dom,
    executeList: [
      {
        fn: bounceText,
        fnProps: [
          dom,
          {
            executeSpace: 200,
            animations: [
              {
                duration: 1000,
                timingFunction: 'ease-in',
                name: 'bounce-top-to-location',
              },
              {
                duration: 200,
                name: 'bounce-shake-sink',
              },
            ],
          },
        ],
      },
    ],
  })

  document.body.append(dom)
}
