import { act, renderHook, fireEvent } from "@testing-library/react";
import useHiddenCursor from "../pages/overlay/hooks/useHiddenCursor";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("testUseHiddenCursor", () => {
  test("cursor is visible during activity", () => {
    const { result } = renderHook(() => useHiddenCursor());

    act(() => {
      fireEvent.mouseMove(document);
    });

    expect(result.current[0]).toBe(false);
    expect(document.documentElement.style.cursor).not.toBe("none");
  });

  test("cursor is visible after 4.999 seconds of inactivity", () => {
    const { result } = renderHook(() => useHiddenCursor());

    act(() => {
      fireEvent.mouseMove(document);
      jest.advanceTimersByTime(4999);
    });

    expect(result.current[0]).toBe(false);
    expect(document.documentElement.style.cursor).not.toBe("none");
  });

  test("cursor becomes hidden after 5 seconds of inactivity", () => {
    const { result } = renderHook(() => useHiddenCursor());

    act(() => {
      fireEvent.mouseMove(document);
      jest.advanceTimersByTime(5000);
    });

    expect(document.documentElement.style.cursor).toBe("none");
    expect(result.current[0]).toBe(true);
  });
});
