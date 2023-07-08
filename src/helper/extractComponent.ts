import j, {
    ASTPath,
    Collection,
    blockStatement,
    functionDeclaration,
    identifier,
    jsxClosingFragment,
    jsxFragment,
    jsxOpeningFragment,
    returnStatement,
} from "jscodeshift";

export type Range = {
    start: number;
    end: number;
};

const PRINT = (output: any) => {
    console.log(output);
};

export type DomElement = string | null;
export type Props<T> = {
    result: T;
    data: Object;
};
export type extractDomElementProps = Props<DomElement>;
export type checkProps = Props<boolean>;
export default class extractComponent {
    private domElement: DomElement;
    private text: string;
    private checkResult: boolean;
    private deltaRange: Range;
    private range: Range;
    private source: string;
    extractDomElement(text: string): extractDomElementProps {
        const openingTagRegex = /<[^/].*?>/g; // 匹配开口语句
        const closingTagRegex = /<\/.*?>/g; // 匹配闭合语句

        const openingMatches = text.match(openingTagRegex); // 所有开口语句的匹配结果
        const closingMatches = text.match(closingTagRegex); // 所有闭合语句的匹配结果

        if (openingMatches === null || closingMatches === null) {
            console.log("这段文本内无完整 DOM 元素！");
            return {
                result: null,
                data: {},
            };
        }

        const firstOpeningMatch = openingMatches[0];
        const lastClosingMatch = closingMatches[closingMatches.length - 1];
        const startIndex: number = text.indexOf(firstOpeningMatch) - 1;
        const endIndex: number =
            text.lastIndexOf(lastClosingMatch) + lastClosingMatch.length - 1;

        const domElement: DomElement = text.slice(startIndex, endIndex + 1);

        return {
            result: domElement,
            data: {
                deltaRange: {
                    start: startIndex,
                    end: endIndex,
                },
            },
        };
    }
    withFragement(domElement: DomElement): DomElement {
        return "<>\n" + domElement! + "\n</>";
    }

    check(): checkProps {
        if (this.domElement === null) {
            return {
                result: false,
                data: {},
            };
        }

        let root: Collection | null = null;
        let validDomElement: DomElement = null;
        try {
            validDomElement = this.domElement;
            root = j(validDomElement);
        } catch (e) {
            console.log("[extractComponent] 所选区域内可能存在兄弟DOM元素");
            try {
                validDomElement = this.withFragement(this.domElement);
                root = j(validDomElement);
            } catch (e) {
                console.log("[extractComponent] 所选区域内无有效DOM元素");
                return {
                    result: false,
                    data: {},
                };
            }
        }

        return {
            result: true,
            data: {
                validDomElement,
            },
        };
    }
    handleSource(source: string, range: Range) {
        const text: string = source.slice(range.start, range.end);
        return text;
    }
    run(source: string, range: Range) {
        this.text = this.handleSource(source, range);

        {
            const { result, data } = this.extractDomElement(this.text);
            this.domElement = result;
            this.deltaRange = data["deltaRange"] ?? null;
        }

        {
            const { result, data } = this.check();
            this.checkResult = result;
        }

        if (this.deltaRange !== null)
            this.range = {
                start: range.start + this.deltaRange.start,
                end: range.start + this.deltaRange.end,
            };

        this.source = this.withReplacedJSXElement(source);
        return this.checkResult;
    }
    modify(): string {
        const fragment = jsxFragment(
            jsxOpeningFragment(),
            jsxClosingFragment(),
        );
        const findJSXElement = j(this.domElement).find(j.JSXElement);
        const newReturnBody = (
            findJSXElement.size
                ? findJSXElement
                : j(this.domElement).find(j.JSXFragment)
        ).get(0).node;
        console.log(newReturnBody);
        const newFunction = functionDeclaration(
            identifier("NewFunction"),
            [],
            blockStatement([returnStatement(newReturnBody)]),
        );

        const root: Collection = j(this.source);
        const insertPath: ASTPath = root
            .findJSXElements("NewFunction")
            .closestScope()
            .paths()[0].parent.parent;
        insertPath.insertBefore(newFunction);
        return root.toSource();
    }
    withReplacedJSXElement(source: string) {
        return new Array(
            source.substring(0, this.range.start - 1),
            "\t<NewFunction />",
            source.substring(this.range.end + 1),
        ).join("");
    }
}
