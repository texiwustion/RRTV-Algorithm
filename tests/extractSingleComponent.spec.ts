import { extractComponent, Range, getNewRange } from "../helper/extractComponent"

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

const println = (str: string) => {
    console.log(str)
}
const extractSingleComponent = (code: string, range: Range) => {
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
    return {
        check: true, data: {
            newText: res
        }
    }
}
const result = extractSingleComponent(code, range)

if (result?.data)

    it("extract single component", async () => {
        const { newText } = result.data
        await expect(newText).toMatchFileSnapshot("./__fixtures__/extractSingleComponent.output.jsx")
    })