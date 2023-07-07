import { Options } from "prettier";
import * as prettier from "prettier";

const options: Options = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    arrowParens: "always",
    parser: "babel",
    plugins: [require.resolve("prettier/parser-babel")]
}
export function prettierCode(code: string) {
    try {
        // 参数1：代码字符串，参数2：格式化配置
        const res = prettier.format(code, options);
        return res
    } catch (error) {
        // 如果格式化失败,返回源码
        return code;
    }
}
