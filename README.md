# bounce

### npm 使用

##### 安装

```bash
npm i bounce-animation
```

##### 使用示例

```ts
import { bounceManager, bounceText } from 'bounce-animation'
import 'bounce-animation/index.css'

const dom = document.createElement('div')

dom.innerText = 'test dance text'
dom.setAttribute('style', 'font-size: 30px; color: #e69; text-shadow: 4px 0 4px red; --bounce-translate-x: 100px;')

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
              duration: 400,
              functionName: 'ease-in',
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
```

##### bounceManager 说明

用于控制动画的触发方式，类型声明如下：

```ts
interface BounceItem<T extends any[]> {
  trigger: 'visible' | 'hidden' | 'hover' | 'click' | 'custom'
  triggerDom: HTMLElement
  onStart?: () => any
  onEnd?: () => any
  executeList: {
    fn: (...props: T) => Promise<any> | any
    fnProps: T
  }[]
}
interface BounceManager {
  append<T extends any[]>(
    item: BounceItem<T>
  ): {
    id: string
    run: () => Promise<void>
  }
  remove(id: string): void
}
```

##### 内置函数

```js
// bounceText // 控制dom下的文本做指定动画
// bounceDom // 控制dom做指定动画
// bounceDomList // 控制一组dom做指定的动画
// bounceChildren // 控制dom下的所有子节点做指定动画
// bounceQuerySelector // 控制指定选择选中的节点所指定动画
// 除了以上内置函数以外，还可以自定义函数，将函数放入bounceManager的fn中即可被其控制
```

##### 内置动画

```js
import 'bounce-animation/index.css' // 引入样式

// 动画名
// bounce-left-to-location // 从左移动到实际位置
// bounce-right-to-location // 从右移动到实际位置
// bounce-top-to-location // 从上移动到实际位置
// bounce-right-to-location // 从下移动到实际位置
// bounce-scale-x // 横向缩放
// bounce-scale-y // 纵向缩放
// bounce-jump-top // 向上跳跃
// bounce-jump-bottom // 向下跳跃
// bounce-loop-spread // 反复左右移动，距离逐渐增大
// bounce-loop-sink // 反复左右移动，距离逐渐减小
// bounce-shake-spread // 反复左右摇摆，角度逐渐增大
// bounce-shake-sink // 反复左右摇摆，角度逐渐减小

// css变量，可在指定dom上覆盖变量的值，以实现同一动画不同表现形式
// --bounce-translate-x: 100px;
// --bounce-translate-y: 100px;
// --bounce-rotate: 60deg;
// --bounce-scale: 1;
```
