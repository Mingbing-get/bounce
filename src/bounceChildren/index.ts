import { BounceDomListOption } from '../bounceDomList/type'
import bounceDomList from '../bounceDomList'

export default async function bounceChildren(dom: HTMLElement, option: BounceDomListOption) {
  await bounceDomList([...dom.children], option)
}
