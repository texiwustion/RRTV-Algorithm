export const getStandardDOM = {
    byText(text: string) {
        const openingTagRegex = /<[^/].*?>/g; // 匹配开口语句
        const closingTagRegex = /<\/.*?>/g; // 匹配闭合语句

        const openingMatches = text.match(openingTagRegex); // 所有开口语句的匹配结果
        const closingMatches = text.match(closingTagRegex); // 所有闭合语句的匹配结果

        if (openingMatches === null || closingMatches === null) {
            console.log("这段文本内无完整 DOM 元素！")
            return null
        }

        const firstOpeningMatch = openingMatches[0]
        const lastClosingMatch = closingMatches[closingMatches.length - 1]
        const startIndex: number = text.indexOf(firstOpeningMatch) - 1
        const endIndex: number = text.lastIndexOf(lastClosingMatch) + lastClosingMatch.length - 1

        const rawText = text.slice(startIndex, endIndex)
        const newText = "<>\n" + rawText + "\n</>"

        return { rawText, newText, deltaRange: {
            start: startIndex,
            end: endIndex
        } }
    }
}

