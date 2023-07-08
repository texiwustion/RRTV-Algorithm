import extractComponent from "../src/helper/extractComponent";
import { code } from "./__fixtures__/extractSingleComponent.input";

describe("extract component", () => {
    const EC = new extractComponent();

    it("run", () => {
        const check = EC.run(code.success, {
            start: 54,
            end: 99,
        });
        if (check) {
            expect(EC.modify()).toMatchSnapshot();
        }
    });
});
