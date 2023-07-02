import * as j from 'jscodeshift'

/**
 * structure: VD (RS (JF (JE (JE JE))))
 */
const text = `const App = () => {
    return (
        <>
            <div>
                <button id="3"></button>
                <p>this is a para</p>
            </div>
        </>
    )
}`

/**
 * the range of selection, present by offset
 * HERE: exactly a whole <div> in text
 */
const range = { start: 56, end: 159 }

export default function transformer(file: j.FileInfo, api: j.API) {
    const j: j.JSCodeshift = api.jscodeshift;
    const root: j.Collection = j(file.source);

    const checker = new Checker()

    {
        const jsxElements: j.Collection = root.findJSXElements()
        console.log('line:22 jsxElements::: ', jsxElements);

        const bestJSXElement = filterMethod.range.bestJSXElement(jsxElements)
        console.log('line:34 bestJSXElement::: ', bestJSXElement);
    }

    {
        const returnStatements: j.Collection = root.find(j.ReturnStatement)
        console.log('line:27 returnStatements::: ', returnStatements);
    }

    {
        const variableDeclaration: j.Collection = root.find(j.VariableDeclaration)
        console.log('line:32 variableDeclaration::: ', variableDeclaration);
    }
    return root.toSource();
}

interface checkProps {
    check: boolean;
    cache?: any;
}

class Checker {
    get(path: j.ASTPath, attr: string): checkProps {
        const res: any = path.get(attr)
        if (!res) {
            return { check: false }
        }
        return { check: true, cache: res }
    }
    range(path: j.ASTPath, range: any): checkProps {
        // if (node?.start <= range.start && range.end <= node?.end) {
        //  node 上无 start 属性
        // }
        const pathStart = path.get('start')
        const pathEnd = path.get('end')
        if (!pathStart || !pathEnd) {
            return { check: false }
        }
        if (pathStart <= range.start && range.end <= pathEnd) {
            return { check: true }
        }
        return { check: false }
    }
}

const filterMethod = {
    range: {
        bestJSXElement: (jsxElements: j.Collection): j.ASTPath | boolean => {
            let best: j.ASTPath | undefined = undefined
            let range = globalThis.range
            jsxElements.forEach((path: j.ASTPath) => {
                if (new Checker().range(path, range)) {
                    best = path
                    range = {
                        start: path.get('start'),
                        end: path.get('end')
                    }
                }
            })
            if (!best)
                return false
            return best
        }
    }
}