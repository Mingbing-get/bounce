import { BounceDomListOption } from '../bounceDomList/type'
import bounceDomList from '../bounceDomList'

export default async function bounceQuerySelector(selector: string, option: BounceDomListOption) {
  await bounceDomList([...document.querySelectorAll(selector)], option)
}
