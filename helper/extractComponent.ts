import { astHandle } from './astErrorHandler';
import * as j from 'jscodeshift'

export const extractComponent = {
    jsxElement: null,
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
            this.jsxElement = result
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