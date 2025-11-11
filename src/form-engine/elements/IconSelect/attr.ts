import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../../common-attr'

export default mergeAttr({
    basic: basicAttr(['props.readonly', 'props.placeholder']),
    high: highAttr(),
    linkage: linkageAttr,
})
