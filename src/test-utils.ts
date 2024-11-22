import { fireEvent } from "@testing-library/react";

export const fireEventFn = {
  ...fireEvent,
  mouseDown: (element: Element) =>
    fireEvent(
      element,
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      })
    ),
  mouseEnter: (element: Element) =>
    fireEvent(
      element,
      new MouseEvent("mouseenter", {
        bubbles: true,
        cancelable: true,
      })
    ),
  mouseLeave: (element: Element) =>
    fireEvent(
      element,
      new MouseEvent("mouseleave", {
        bubbles: true,
        cancelable: true,
      })
    ),
  keyDown: (element: Element, options: any) =>
    fireEvent(
      element,
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        ...options,
      })
    ),
};
