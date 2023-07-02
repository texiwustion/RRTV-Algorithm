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
        const pathStart = path.get('start').value
        const pathEnd = path.get('end').value
        // \\ Fix: need visit value
        if (!pathStart || !pathEnd) {
            return { check: false }
        }
        /**
         * range.start | PathStart | pathEnd | range.end
         */
        if (range.start <= pathStart && pathEnd <= range.end) {
            return { check: true }
        }
        // \\ Fix: 包裹关系
        return { check: false }
    }
}

const filterMethod = {
    range: {
        bestJSXElement: (jsxElements: j.Collection): j.ASTPath | boolean => {
            let best: j.ASTPath | undefined = undefined
            let bestRange = range
            // \\ Fix: 用不同名，方便访问全局变量
            jsxElements.forEach((path: j.ASTPath) => {
                if (new Checker().range(path, bestRange)) {
                    best = path
                    bestRange = {
                        start: path.get('start').value,
                        end: path.get('end').value
                    }
                }
            })
            if (best === undefined)
                return false
            return best
        }
    }
}