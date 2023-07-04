import { getStandardDOM } from "./getStandardDOM"
import * as j from 'jscodeshift'

/**
 * use babel analyser for making exactly complete jsxElement
 * @param text String, a range of text from USER selection
 * @returns null | root: j.Collection (a complete jsxElement)
 */
export function astHandle(text: string): j.Collection<any> | null {
    const result = getStandardDOM.byText(text)
    if (result === null) {
        return null
    }
    let root: j.Collection<any> | null = null
    try {
        root = j(result.rawText)
    }
    catch (e) {
        try {
            root = j(result.newText)
        }
        catch (e) {
            console.log("[astErrorHandler]Line24::: Error: 所选区域内 DOM 元素不完整！")
        }
    }

    if (root === null) {
        return null
    }
    else {
        return root
    }
}
