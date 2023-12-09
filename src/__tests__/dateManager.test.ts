import { calculateAge, formatDate, isBirthday } from "../utils/dateManager";

const calculateAndExpect = (dob: string, expected: string) => {
  expect(calculateAge(dob)).toBe(expected);
};

describe("testCalculateAge", () => {
  describe("Time is GMT + 1, UTC 00:00:00 ", () => {
    const mockedDate = new Date("2023-11-30");

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockedDate);
    });

    test("age > 1 year", () => {
      calculateAndExpect("2000-01-01", "23 yrs");
    });

    test("age < 1 year", () => {
      calculateAndExpect("2023-06-24", "5 mths");
    });

    test("age < 1 month", () => {
      calculateAndExpect("2023-11-14", "2 wks");
    });

    test("age < 1 week", () => {
      calculateAndExpect("2023-11-25", "5 days");
    });

    test("not accurate DOB, only year and month", () => {
      calculateAndExpect("2023-11", "~4 wks");
    });

    test("not accurate DOB, only year", () => {
      calculateAndExpect("2022", "~1 yr");
    });

    test("future", () => {
      calculateAndExpect("2023-12-01", "-1 day");
    });

    test("birthday was yesterday", () => {
      calculateAndExpect("2022-11-29", "1 yr");
    });

    test("birthday is today", () => {
      calculateAndExpect("2022-11-30", "12 mths");
    });

    test("birthday is tommorow", () => {
      calculateAndExpect("2022-12-01", "11 mths");
    });

    test("DOB < 1970", () => {
      calculateAndExpect("1923-11-30", "100 yrs");
    });

    afterEach(() => {
      jest.useRealTimers();
    });
  });

  describe("Time +02:06:40", () => {
    const anotherMockedDate = new Date("2023-11-30T02:06:40");

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(anotherMockedDate);
    });

    // up to 02:06:39 age is 12 mths (age in years is calculated as 0.9999999682942295) because we are dividing with rounded number 3.154e10
    // after is 1 yr

    test("birthday is today", () => {
      calculateAndExpect("2022-11-30", "1 yr");
    });

    afterEach(() => {
      jest.useRealTimers();
    });
  });
});

describe("testFormatDate", () => {
  test("date with day, month, and year, December", () => {
    const result = formatDate("2023-12-01");
    expect(result).toBe("December 1st, 2023");
  });

  test("date with day, month, and year, January", () => {
    const result = formatDate("2023-01-01");
    expect(result).toBe("January 1st, 2023");
  });

  test("date with made up month", () => {
    const result = formatDate("2023-13-01");
    expect(result).toBe("Invalid month 1st, 2023");
  });

  test("date with month and year", () => {
    const result = formatDate("2023-12");
    expect(result).toBe("~December, 2023");
  });

  test("date with year only", () => {
    const result = formatDate("2023");
    expect(result).toBe("~2023");
  });

  // first word is saved into year, and is not transformed
  // rest is transformed into undefined and NaNth
  // result is the first word
  test("invalid input", () => {
    const result = formatDate("testyear-testmonth-testday");
    expect(result).toBe("~testyear");
  });
});

describe("testIsBirthday", () => {
  const mockedDate = new Date("2023-11-30");

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
  });

  test("returns true if it is the birthday", () => {
    const birthday = "1990-11-30";
    expect(isBirthday(birthday)).toBe(true);
  });

  test("returns false if it is not the birthday", () => {
    const nonBirthday = "1990-12-01";
    expect(isBirthday(nonBirthday)).toBe(false);
  });

  test("returns false for invalid date format", () => {
    // Invalid date format (missing day)
    const invalidDate = "1990-12";
    expect(isBirthday(invalidDate)).toBe(false);
  });
  afterEach(() => {
    jest.useRealTimers();
  });
});
