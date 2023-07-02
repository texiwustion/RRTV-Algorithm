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

    {
        const jsxElements: j.Collection = root.findJSXElements()
        console.log('line:22 jsxElements::: ', jsxElements);
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
        return { check: true, cache: res}
    }
    range(path: j.ASTPath): checkProps {
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