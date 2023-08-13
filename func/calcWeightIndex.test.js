import calcWeightIndex from "./calcWeightIndex";

/*
1. Given weight in kg and height in MediaStreamTrack.
2. Return weight / (height * height) round 2 after float.
3. If given invalid data throw error with correct message.

90, 1.9 => 24.93
1.9, 90 => error 'weight must be first argument and height second'
90 => error 'weight and height required'
'90', '1.9' => error 'weight and height must be numbers'
*/

describe(" test calcWeightIndex function", () => {
  test("90, 1.9 => 24.93", () => {
    const result = calcWeightIndex(90, 1.9);
    expect(result).toBe(24.93);
  });

  test("1.9, 90 => error 'weight must be first argument and height second'", () => {
    expect(() => calcWeightIndex(1.9, 90)).toThrow(
      "weight must be first argument and height second"
    );
  });

  test("90 => error 'weight and height required'", () => {
    expect(() => calcWeightIndex()).toThrow("weight and height required");
  });

  it("'90', '1.9' => error 'weight and height must be number'", () => {
    expect(() => calcWeightIndex("90", "1.9")).toThrow(
      "weight and height must be number"
    );
  });
});
