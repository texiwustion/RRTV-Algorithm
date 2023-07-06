import { extractComponent, getNewRange, Range } from '../helper/extractComponent';

const document = `const TestSim = () => {
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

const result1 = `function NewFunction() {
    return <button id="1" me="2"></button>;   
}

const TestSim = () => {
  return <>
        <hello>
                <NewFunction />
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
}`
const range = {
    start: 44,
    end: 79
}

const text = document.slice(range.start, range.end)


const check = extractComponent.check(text)
it("check valid", () => {
    expect(check).toBeTruthy()
})

const deltaRange: Range = extractComponent?.deltaRange!
const newRange = getNewRange(range, deltaRange)
let merelyExtractText: string
if (newRange !== null) {
    merelyExtractText = new Array(
        document.substring(0, newRange.start - 1),
        "\t\t<NewFunction />",
        /// TODO: 随机字符串生成 + snippet，方便程序和snippet 定位
        document.substring(newRange.end + 1)
    ).join("")

}

const res = extractComponent.modify(merelyExtractText!)

it("extract component", () => {
    expect(res).toBeTypeOf("string")
})