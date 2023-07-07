import { extractComponent, getNewRange, Range } from '../helper/extractComponent';

const code = `const TestSim = () => {
    return <>
        <hello>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </hello>
        <div>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </div>
        <p></p>
    </> 
    }
    const TestSim2 = () => {
    return <>
        <code></code>
        <div>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </div>
        <hello>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </hello>
    </> 
    }

    function NewFunction({id, me, you, type}) {
    return <>
        <div>
            <button id={id} me={me}></button>
            <button you={you} type={type}></button>
        </div>
    </>
    }`

const range = {
    start: 54,
    end: 99
}

it("give code", () => {
    expect(code).toBeDefined()
})
it("give range", () => {
    expect(range).toBeDefined()
})

const selection = code.slice(range.start, range.end)

it("calculate selection", () => {
    expect(selection).toBeDefined()
})

const check = extractComponent.check(selection)
it("check valid", () => {
    expect(check).toBeTruthy()
})

const deltaRange: Range = extractComponent?.deltaRange!
const newRange = getNewRange(range, deltaRange)
let jsxSnippet: string
if (newRange !== null) {
    jsxSnippet = new Array(
        code.substring(0, newRange.start - 1),
        "\t\t<NewFunction />",
        /// TODO: 随机字符串生成 + snippet，方便程序和snippet 定位
        code.substring(newRange.end + 1)
    ).join("")
}
it("caculate jsxSnippet", () => {
    expect(jsxSnippet).toBeDefined()
})

const res = extractComponent.modify(jsxSnippet!)

it("extract component", () => {
    expect(res).toBeTypeOf("string")
})

