import bounceQuerySelector from '../src/bounceQuerySelector'
import bounceManager from '../src/bounceManager'

export default function bounceQuerySelectorExample() {
  const dom = document.createElement('div')
  dom.setAttribute('style', 'padding: 10px; width: 320px; margin-left: 100px;')

  for (let i = 0; i < 9; i++) {
    const item = document.createElement('div')
    item.setAttribute('class', 'test-query-item')
    item.setAttribute('style', 'background-color: #88f; width: 30%; height: 90px; display: inline-block; margin: 5px')
    dom.append(item)
  }

  bounceManager.append({
    trigger: 'click',
    triggerDom: dom,
    executeList: [
      {
        fn: bounceQuerySelector,
        fnProps: [
          '.test-query-item',
          {
            animations: (index) => {
              let name = 'bounce-shake-sink'
              if ([0, 1, 2].includes(index)) {
                name = 'bounce-top-to-location'
              } else if (index === 3) {
                name = 'bounce-left-to-location'
              } else if (index === 5) {
                name = 'bounce-right-to-location'
              } else if ([6, 7, 8].includes(index)) {
                name = 'bounce-bottom-to-location'
              }

              return [
                {
                  name,
                  duration: 2000,
                  delay: index * 100,
                },
              ]
            },
          },
        ],
      },
    ],
  })

  document.body.append(dom)
}
