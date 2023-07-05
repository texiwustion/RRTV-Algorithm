import { astHandle } from './astErrorHandler';
import * as j from 'jscodeshift'

export const extractComponent = {
    jsxElement: null,
    rawText: null,
    newText: null,
    deltaRange: null,
    useText: null,
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
            throw new Error("[extractComponent] Line 22 ::: 在 modify 前未执行 check!")
        }

        const root = j(document)
        return root.findJSXElements('button').map(path=>path.get("end"))
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