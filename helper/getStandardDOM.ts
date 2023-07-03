export const getStandardDOM = {
    byText(text: string) {
        const openingTagRegex = /<[^/].*?>/g; // 匹配开口语句
        const closingTagRegex = /<\/.*?>/g; // 匹配闭合语句

        const openingMatches = text.match(openingTagRegex); // 所有开口语句的匹配结果
        const closingMatches = text.match(closingTagRegex); // 所有闭合语句的匹配结果

        if (openingMatches === null || closingMatches === null) {
            console.log("这段文本内无完整 DOM 元素！")
            return
        }

        const firstOpeningMatch = openingMatches[0]
        const lastClosingMatch = closingMatches[closingMatches.length - 1]
        const startIndex: number = text.indexOf(firstOpeningMatch) - 1
        const endIndex: number = text.lastIndexOf(lastClosingMatch) + lastClosingMatch.length

        const rawText = text.slice(startIndex, endIndex)
        console.log('line:20 rawText::: ', rawText);
        const newText = "<>\n" + rawText + "\n</>"
        console.log('line:22 newText::: ', newText);
    }
}

const text = `=> <button> eiarsnt</button> 
<div>
    <p></p>
    <button> </button>
</div`

getStandardDOM.byText(text)