import { renderHook, act } from "@testing-library/react";
import useIntelligentTimer from "../pages/overlay/hooks/useIntelligentTimer"; // Update with the correct file path

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("testStart", () => {
  test("start function starts a timer", () => {
    const { result } = renderHook(() => useIntelligentTimer());
    const [start] = result.current;

    act(() => {
      start(() => {}, 1000);
    });

    jest.advanceTimersByTime(1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test("useIntelligentTimer - callback is called after a delay", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIntelligentTimer());
    const [start] = result.current;

    act(() => {
      start(callback, 1000);
    });

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe("testStop", () => {
  test("useIntelligentTimer - is stopped - callback is never called", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useIntelligentTimer());
    const [start, stop] = result.current;

    act(() => {
      start(callback, 1000);
    });
    jest.advanceTimersByTime(500);

    act(() => {
      stop();
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
