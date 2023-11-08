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

interface CacheBounceItem<T extends any[]> extends BounceItem<T> {
  isRunning?: boolean
  executeTimes: number
  run: () => Promise<void>
}

class BounceManager {
  private cache: Map<string, CacheBounceItem<any[]>>
  private observer: IntersectionObserver
  private dataIdKey = 'bounce-cache-id'

  constructor() {
    this.cache = new Map()
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute(this.dataIdKey) || ''
        const cacheItem = this.cache.get(id)
        if (!cacheItem) return

        if (cacheItem.trigger === 'visible' && entry.isIntersecting) {
          this.run(id)
        } else if (cacheItem.trigger === 'hidden' && !entry.isIntersecting) {
          this.run(id)
        }
      })
    })
  }

  append<T extends any[]>(item: BounceItem<T>) {
    const id = this.createId()
    const run = async () => {
      await this.run(id)
    }

    this.cache.set(id, { ...item, executeTimes: 0, run })

    if (item.trigger === 'click') {
      item.triggerDom.addEventListener('click', run)
    } else if (item.trigger === 'hover') {
      item.triggerDom.addEventListener('mouseenter', run)
    } else if (item.trigger === 'visible' || item.trigger === 'hidden') {
      item.triggerDom.setAttribute(this.dataIdKey, id)
      this.observer.observe(item.triggerDom)
    }

    return { id, run }
  }

  remove(id: string) {
    const cacheItem = this.cache.get(id)
    if (!cacheItem) return

    if (cacheItem.trigger === 'click') {
      cacheItem.triggerDom.removeEventListener('click', cacheItem.run)
    } else if (cacheItem.trigger === 'hover') {
      cacheItem.triggerDom.removeEventListener('mouseenter', cacheItem.run)
    } else if (cacheItem.trigger === 'visible' || cacheItem.trigger === 'hidden') {
      this.observer.unobserve(cacheItem.triggerDom)
    }

    this.cache.delete(id)
  }

  private async run(id: string) {
    const cacheItem = this.cache.get(id)
    if (!cacheItem || cacheItem.isRunning) return

    cacheItem.executeTimes++
    if (cacheItem.trigger === 'hidden' && cacheItem.executeTimes === 1) return // 过滤页面初始化时触发的hidden

    cacheItem.isRunning = true
    cacheItem.onStart?.()
    for (const fnInfo of cacheItem.executeList) {
      await fnInfo.fn(...fnInfo.fnProps)
    }
    cacheItem.isRunning = false
    cacheItem.onEnd?.()
  }

  private createId() {
    let id = ''

    while (!id || this.cache.has(id)) {
      id = `${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`
    }

    return id
  }
}

export default new BounceManager()
