import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, renderHook } from "@testing-library/react";
import { useClickOutside } from "./hooks";

describe("useClickOutside", () => {
  let handler: () => void;
  let container: HTMLDivElement;
  let element: HTMLDivElement;
  let secondElement: HTMLDivElement;

  beforeEach(() => {
    handler = vi.fn();
    container = document.createElement("div");
    element = document.createElement("div");
    secondElement = document.createElement("div");
    container.appendChild(element);
    container.appendChild(secondElement);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  it("calls handler when clicking outside single ref", () => {
    renderHook(() => useClickOutside([{ current: element }], handler));

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    // Click inside
    fireEvent.mouseDown(element);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("calls handler when clicking outside multiple refs", () => {
    renderHook(() =>
      useClickOutside(
        [{ current: element }, { current: secondElement }],
        handler
      )
    );

    // Click outside both elements
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    // Click inside first element
    fireEvent.mouseDown(element);
    expect(handler).toHaveBeenCalledTimes(1);

    // Click inside second element
    fireEvent.mouseDown(secondElement);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("handles null refs", () => {
    renderHook(() => useClickOutside([{ current: null }], handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("handles escape key", () => {
    renderHook(() => useClickOutside([{ current: element }], handler));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handler).toHaveBeenCalledTimes(1);

    // Other keys should not trigger handler
    fireEvent.keyDown(document, { key: "Enter" });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not trigger when disabled", () => {
    renderHook(() => useClickOutside([{ current: element }], handler, false));

    fireEvent.mouseDown(document.body);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(handler).not.toHaveBeenCalled();
  });

  it("cleans up event listeners on unmount", () => {
    const { unmount } = renderHook(() =>
      useClickOutside([{ current: element }], handler)
    );

    unmount();

    fireEvent.mouseDown(document.body);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(handler).not.toHaveBeenCalled();
  });

  it("handles click events inside nested elements", () => {
    const nestedElement = document.createElement("div");
    element.appendChild(nestedElement);

    renderHook(() => useClickOutside([{ current: element }], handler));

    // Click on nested element
    fireEvent.mouseDown(nestedElement);
    expect(handler).not.toHaveBeenCalled();
  });

  it("handles multiple refs with overlapping hierarchies", () => {
    const parentElement = document.createElement("div");
    const childElement = document.createElement("div");
    parentElement.appendChild(childElement);
    container.appendChild(parentElement);

    renderHook(() =>
      useClickOutside(
        [{ current: parentElement }, { current: childElement }],
        handler
      )
    );

    // Click on child element
    fireEvent.mouseDown(childElement);
    expect(handler).not.toHaveBeenCalled();

    // Click on parent element
    fireEvent.mouseDown(parentElement);
    expect(handler).not.toHaveBeenCalled();

    // Click outside both
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
