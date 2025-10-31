import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "../practice.js";

describe("capitalize()", () => {
  test("first character of string is capitalized", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("world")).toBe("World");
    expect(capitalize("a b c")).toBe("A b c");
    expect(capitalize("a")).toBe("A");
    expect(capitalize("this is a sentence.")).toBe("This is a sentence.");
  });

  test("empty string returns empty", () => {
    expect(capitalize(" ")).toBe(" ");
  });

  test("no effect on non-letter characters", () => {
    const testStrings = ["123", "456abc", "&*(", "@#$abc"];
    for (const string of testStrings) {
      expect(capitalize(string)).toBe(string);
    }
  });

  test("leading whitespace is ignored", () => {
    expect(capitalize("               hello")).toBe("               Hello");
    expect(capitalize("     world")).toBe("     World");
    expect(capitalize("   a b c")).toBe("   A b c");
    expect(capitalize("     a")).toBe("     A");
    expect(capitalize("              this is a sentence.")).toBe(
      "              This is a sentence.",
    );
  });
});

describe("reverseString()", () => {
  test("string is returned reversed", () => {
    expect(reverseString("hello")).toBe("olleh");
    expect(reverseString("world")).toBe("dlrow");
    expect(reverseString("1@3$5^")).toBe("^5$3@1");
    expect(reverseString("a")).toBe("a");
    expect(reverseString("this is a sentence.")).toBe(".ecnetnes a si siht");
  });

  test("empty string returns empty", () => {
    expect(reverseString(" ")).toBe(" ");
  });

  test("whitespace is reversed", () => {
    expect(reverseString("    hello")).toBe("olleh    ");
    expect(reverseString("hello    ")).toBe("    olleh");
    expect(reverseString("   hello     ")).toBe("     olleh   ");
  });
});

describe("calculator", () => {
  test("addition operation works", () => {
    expect(calculator.add(1, 5)).toBe(6);
    expect(calculator.add(0, 0)).toBe(0);
    expect(calculator.add(-1, 5)).toBe(4);
    expect(calculator.add(-9, -9)).toBe(-18);
    expect(calculator.add(2.5, 3.87)).toBeCloseTo(6.37);
  });

  test("subtraction operation works", () => {
    expect(calculator.subtract(1, 5)).toBe(-4);
    expect(calculator.subtract(0, 0)).toBe(0);
    expect(calculator.subtract(-1, 5)).toBe(-6);
    expect(calculator.subtract(-2, -9)).toBe(7);
    expect(calculator.subtract(2.5, 3.87)).toBeCloseTo(-1.37);
  });

  test("multiplication operation works", () => {
    expect(calculator.multiply(1, 5)).toBe(5);
    expect(calculator.multiply(0, 0)).toBe(0);
    expect(calculator.multiply(0, 5)).toBe(0);
    expect(calculator.multiply(-1, 5)).toBe(-5);
    expect(calculator.multiply(-2, -9)).toBe(18);
    expect(calculator.multiply(2.5, 3.87)).toBeCloseTo(9.675);
  });

  test("division operation works", () => {
    expect(calculator.divide(1, 5)).toBeCloseTo(0.2);
    expect(calculator.divide(0, 5)).toBe(0);
    expect(calculator.divide(-1, 5)).toBeCloseTo(-0.2);
    expect(calculator.divide(-2, -9)).toBeCloseTo(0.2222222222, 8);
    expect(calculator.divide(2.5, 3.87)).toBeCloseTo(0.6459948320413437, 8);
  });

  test("division by 0 returns an error message", () => {
    expect(calculator.divide(1, 0)).toBe("Error");
    expect(calculator.divide(0, 0)).toBe("Error");
    expect(calculator.divide(-1, 0)).toBe("Error");
    expect(calculator.divide(2.5, 0)).toBe("Error");
  });
});

describe("caesarCipher()", () => {
  test("string is properly ciphered", () => {
    expect(caesarCipher("abc", 3)).toBe("def");
    expect(caesarCipher("abc", 0)).toBe("abc");
    expect(caesarCipher("xyz", -3)).toBe("uvw");
  });

  test("cipher properly wraps from z to a", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
    expect(caesarCipher("abc", -3)).toBe("xyz");
  });

  test("the shifted lettercase should follow the original lettercase", () => {
    expect(caesarCipher("ABC", 3)).toBe("DEF");
    expect(caesarCipher("aBcD", 3)).toBe("dEfG");
    expect(caesarCipher("aBc", 0)).toBe("aBc");
    expect(caesarCipher("xyz", -3)).toBe("uvw");
  });

  test("cipher properly wraps when using large ( > 26) shift factors", () => {
    expect(caesarCipher("xyz", 27)).toBe("yza");
    expect(caesarCipher("xyz", 29)).toBe("abc");
    expect(caesarCipher("abc", -27)).toBe("zab");
    expect(caesarCipher("abc", -29)).toBe("xyz");
  });

  test("non-alphabetical characters should remain unchanged", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
    expect(caesarCipher("123456789aBcD~!@#$%^&*()_+?'", 3)).toBe(
      "123456789dEfG~!@#$%^&*()_+?'",
    );
    expect(caesarCipher("123!@#", 12)).toBe("123!@#");
  });
});

describe("analyzeArray()", () => {
  describe("function reutrns object with correctly calculated properties", () => {
    const testObject = analyzeArray([1, 8, 3, 4, 2, 6]);
    const testObjectExpected = {
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    };

    test("average is calculated correctly", () => {
      expect(testObject.average).toBe(testObjectExpected.average);
    });

    test("min is calculated correctly", () => {
      expect(testObject.min).toBe(testObjectExpected.min);
    });

    test("max is calculated correctly", () => {
      expect(testObject.max).toBe(testObjectExpected.max);
    });

    test("length is calculated correctly", () => {
      expect(testObject.length).toBe(testObjectExpected.length);
    });
  });

  test("empty array returns zeroes for all properties", () => {
    const testObject = analyzeArray([]);

    expect(testObject.average).toBe(0);
    expect(testObject.min).toBe(0);
    expect(testObject.max).toBe(0);
    expect(testObject.length).toBe(0);
  });

  test("array with one element is correctly calculated", () => {
    const testObject = analyzeArray([-2.5]);

    expect(testObject.average).toBeCloseTo(-2.5);
    expect(testObject.min).toBeCloseTo(-2.5);
    expect(testObject.max).toBeCloseTo(-2.5);
    expect(testObject.length).toBe(1);
  });
});
