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
 */
const range = { start: 3, end: 19 }

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