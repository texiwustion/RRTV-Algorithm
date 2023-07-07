import { extractSingleComponent } from "../helper/extractComponent"

import { code, range, random_range } from "./__fixtures__/extractSingleComponent.input"

import { prettierCode } from "../helper/prettier"

import * as fs from "node:fs"
import * as path from "node:path"

it("extract single component --success", async () => {
    const result = extractSingleComponent(code.success, range.success)
    await expect(result).toMatchFileSnapshot("./__fixtures__/extractSingleComponent-success.output")
})

it("extract single component --faild", async () => {
    const result = extractSingleComponent(code.success, range.failed)
    await expect(result).toMatchFileSnapshot("./__fixtures__/extractSingleComponent-failed.output")
})

it("extract single component --random-range", async () => {
    const content = `\nconst range_${random_range.start}_${random_range.end} = ${JSON.stringify(random_range, null, 4)}`
    const result = extractSingleComponent(code.success, random_range)
    await fs.appendFile(path.join(__dirname, '__fixtures__/extractSingleComponent.random.ts'), content, 'utf-8', (err) => {
        console.log(content)
    })
    if (result.check === true) {
        const newText = `\nconst text_${random_range.start}_${random_range.end} = \`${await prettierCode(result.data.newText)}\``
        await fs.appendFile(path.join(__dirname, '__fixtures__/extractSingleComponent.random.ts'), newText, 'utf-8', ()=>{})
    }
    await expect(result).toMatchFileSnapshot("./__fixtures__/extractSingleComponent-random.output")
})



