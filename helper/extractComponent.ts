import { astHandle } from './astErrorHandler';
import * as j from 'jscodeshift'

interface extractComponentProps {
    jsxElement: null | j.JSXElement;
    rawText: null | string;
    newText: null | string;
    deltaRange: null | Range;
    useText: null | string;
    newFunction: null | j.FunctionDeclaration
    check(text: string): boolean;
    modify(document: string): string;
}
export const extractComponent: extractComponentProps = {
    jsxElement: null,
    rawText: null,
    newText: null,
    deltaRange: null,
    useText: null,
    newFunction: null,
    /**
     * check this text if is valid
     * @param text String, from USER selection
     * @returns boolean to judge this check if valid
     */
    check(text: string): boolean {
        const result = astHandle(text)

        if (result === null) {
            return false
        }
        else {
            this.jsxElement = result.root
            this.rawText = result.rawText
            this.newText = result.newText
            this.deltaRange = result.deltaRange
            this.useText = result.useText
            return true
        }
    },
    modify(document: string) {
        if (this.jsxElement === null) {
            println("[extractComponent] Line 22 ::: 在 modify 前未执行 check!")
            return "error"
        }

        const fragment = j.jsxFragment(j.jsxOpeningFragment(), j.jsxClosingFragment())
        let newReturnBody
        if (this.useText === 'newText')
            newReturnBody = j(this.newText).find(j.JSXFragment).paths()[0].node
        else
            newReturnBody = j(this.rawText).find(j.JSXElement).paths()[0].node
        this.newFunction = j.functionDeclaration(
            j.identifier("NewFunction"),
            [],
            j.blockStatement([
                j.returnStatement(newReturnBody)
            ])
        )
        if (this.newFunction === null) {
            throw new Error("[extractComponent] Line 37 ::: 组件提取失败！")
        }

        const root: j.Collection = j(document)
        const insertPath: j.ASTPath = root.findJSXElements('NewFunction').closestScope().paths()[0].parent.parent
        insertPath.insertBefore(this.newFunction)
        return root.toSource()
    }
}

export interface Range {
    start: number;
    end: number;
}

export function getNewRange(range: Range, deltaRange: Range) {
    if (deltaRange === null)
        return null
    return {
        start: range.start + deltaRange.start,
        end: range.start + deltaRange.end
    }
}

export const getAstNode = {
    byRange(range: Range, root: j.Collection) {
        root.find(j.JSXElement)
    }
}

export const println = (str: string) => {
    console.log(str)
}

export const extractSingleComponent = (code: string, range: Range) => {
    const selection = code.slice(range.start, range.end)
    const check: boolean = extractComponent.check(selection)
    if (!check) {
        println("[extractComponent] check is false")
        return { check: false }
    }
    const deltaRange: Range = extractComponent?.deltaRange!
    const newRange = getNewRange(range, deltaRange)
    if (newRange === null) {
        println("[extractComponent] failed in caculate newRange")
        return { check: false }
    }
    const jsxSnippet = new Array(
        code.substring(0, newRange.start - 1),
        "\t\t<NewFunction />",
        /// TODO: 随机字符串生成 + snippet，方便程序和snippet 定位
        code.substring(newRange.end + 1)
    ).join("")
    const res = extractComponent.modify(jsxSnippet!)
    return { check: true, data: {
        newText: res
    }}
}