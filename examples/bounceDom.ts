import bounceDom from '../src/bounceDom'
import bounceManager from '../src/bounceManager'

export default function bounceDomExample() {
  const dom = document.createElement('div')
  dom.setAttribute('style', 'width: 200px; height: 200px; background-color: #e72; --bounce-translate-x: 500px')

  bounceManager.append({
    trigger: 'click',
    triggerDom: dom,
    executeList: [
      {
        fn: bounceDom,
        fnProps: [
          dom,
          {
            animations: [
              {
                name: 'bounce-loop-spread',
                duration: 300,
              },
              {
                name: 'bounce-right-to-location',
                duration: 500,
              },
              {
                name: 'bounce-shake-sink',
                duration: 200,
              },
            ],
          },
        ],
      },
    ],
  })

  document.body.append(dom)
}
