import { prettierCode } from "../src/helper/prettier";

it("test prettier", async () => {
    const code = `//格式故意搞乱，不对齐！
function uglyCode () {
                    console.log("this is an ugly function!") 
 }`;
    expect(await prettierCode(code)).toMatchSnapshot();
});
