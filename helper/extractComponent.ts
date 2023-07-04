import { astHandle } from './astErrorHandler';
import * as j from 'jscodeshift'

export const extractComponent = {
    jsxElement: null,
    rawText: null,
    newText: null,
    deltaRange: null,
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
            return true
        }
    },
    modify(document: string) {
        if (this.jsxElement === null) {
            throw new Error("[extractComponent] Line 22 ::: 在 modify 前未执行 check!")
        }

        const root = j(document)
    }
}

export interface Range {
    start: number;
    end: number;
}

export function getNewRange(range: Range, deltaRange: Range) {
    return {
        start: range.start + deltaRange.start,
        end: range.start + deltaRange.end
    }
}