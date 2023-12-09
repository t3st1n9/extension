import { normalizeAmbassadorName } from "../hooks/useChatCommand";

describe("testNormalizeAmbassadorName", () => {
  test("normalized name without diacritic marks", () => {
    const inputName = "Jalapeño";
    const expectedOutput = "jalapeno";

    const result = normalizeAmbassadorName(inputName, true);

    expect(result).toEqual(expectedOutput);
  });

  test("normalized name with diacritic marks", () => {
    const inputName = "Jalapeño";
    const expectedOutput = "jalapeño";

    const result = normalizeAmbassadorName(inputName);

    expect(result).toEqual(expectedOutput);
  });

  test("normalized name to only first word", () => {
    const inputName = "Hank Mr. McTrain";
    const expectedOutput = "hank";

    const result = normalizeAmbassadorName(inputName);

    expect(result).toEqual(expectedOutput);
  });
});
