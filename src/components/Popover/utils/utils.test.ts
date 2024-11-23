import { describe, it, expect, beforeEach } from "vitest";
import { calculatePosition, getArrowStyle } from "./utils";
import type { PopoverPlacement } from "../types";

describe("Popover Utils", () => {
  const mockTriggerRect = {
    top: 100,
    left: 100,
    width: 100,
    height: 50,
  };

  const mockContentRect = {
    top: 0,
    left: 0,
    width: 200,
    height: 100,
  };

  describe("calculatePosition", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });
      Object.defineProperty(window, "innerWidth", {
        value: 1200,
        configurable: true,
      });
    });

    it.each([
      ["top", { x: 50, y: 8 }],
      ["top-start", { x: 100, y: 8 }],
      ["top-end", { x: 8, y: 8 }],
      ["bottom", { x: 50, y: 158 }],
      ["bottom-start", { x: 100, y: 158 }],
      ["bottom-end", { x: 8, y: 158 }],
      ["left", { x: 8, y: 75 }],
      ["left-start", { x: 8, y: 100 }],
      ["left-end", { x: 8, y: 50 }],
      ["right", { x: 208, y: 75 }],
      ["right-start", { x: 208, y: 100 }],
      ["right-end", { x: 208, y: 50 }],
    ] as [PopoverPlacement, { x: number; y: number }][])(
      "calculates correct position for %s placement",
      (placement, expected) => {
        const { position } = calculatePosition(
          mockTriggerRect,
          mockContentRect,
          placement,
          8,
          false
        );
        expect(position).toEqual(expected);
      }
    );

    it("handles auto placement when near viewport edges", () => {
      // Test top edge
      const topEdgeTrigger = { ...mockTriggerRect, top: 20 };
      const { finalPlacement: topPlacement } = calculatePosition(
        topEdgeTrigger,
        mockContentRect,
        "top",
        8,
        true
      );
      expect(topPlacement).toBe("bottom");

      // Test bottom edge
      const bottomEdgeTrigger = {
        ...mockTriggerRect,
        top: window.innerHeight - 20,
      };
      const { finalPlacement: bottomPlacement } = calculatePosition(
        bottomEdgeTrigger,
        mockContentRect,
        "bottom",
        8,
        true
      );
      expect(bottomPlacement).toBe("top");

      // Test left edge
      const leftEdgeTrigger = { ...mockTriggerRect, left: 20 };
      const { finalPlacement: leftPlacement } = calculatePosition(
        leftEdgeTrigger,
        mockContentRect,
        "left",
        8,
        true
      );
      expect(leftPlacement).toBe("right");

      // Test right edge
      const rightEdgeTrigger = {
        ...mockTriggerRect,
        left: window.innerWidth - 20,
      };
      const { finalPlacement: rightPlacement } = calculatePosition(
        rightEdgeTrigger,
        mockContentRect,
        "right",
        8,
        true
      );
      expect(rightPlacement).toBe("left");
    });

    it("adjusts position to stay within viewport", () => {
      const edgeTrigger = {
        top: window.innerHeight - 10,
        left: window.innerWidth - 10,
        width: 100,
        height: 50,
      };

      const { position } = calculatePosition(
        edgeTrigger,
        mockContentRect,
        "bottom-end",
        8,
        true
      );

      expect(position.x).toBeLessThanOrEqual(
        window.innerWidth - mockContentRect.width - 8
      );
      expect(position.y).toBeLessThanOrEqual(
        window.innerHeight - mockContentRect.height - 8
      );
    });

    it("respects custom offset", () => {
      const customOffset = -16;
      const { position } = calculatePosition(
        mockTriggerRect,
        mockContentRect,
        "top",
        customOffset,
        false
      );

      expect(position.y).toBe(
        mockTriggerRect.top - mockContentRect.height - customOffset
      );
    });
  });

  describe("getArrowStyle", () => {
    it.each([
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ] as PopoverPlacement[])(
      "returns correct arrow styles for %s placement",
      (placement) => {
        const style = getArrowStyle(placement);

        // Basic style checks
        expect(style.transform).toContain("rotate(45deg)");
        expect(Object.keys(style).length).toBeGreaterThanOrEqual(2);

        // Position-specific checks
        if (placement.startsWith("top")) {
          expect(style.bottom).toBe("-4px");
        } else if (placement.startsWith("bottom")) {
          expect(style.top).toBe("-4px");
        } else if (placement.startsWith("left")) {
          expect(style.right).toBe("-4px");
        } else if (placement.startsWith("right")) {
          expect(style.left).toBe("-4px");
        }

        // Alignment checks
        if (placement.endsWith("-start")) {
          expect(style.transform).toBe("rotate(45deg)");
          if (placement.startsWith("top") || placement.startsWith("bottom")) {
            expect(style.left).toBe("20px");
          } else {
            expect(style.top).toBe("20px");
          }
        } else if (placement.endsWith("-end")) {
          expect(style.transform).toBe("rotate(45deg)");
          if (placement.startsWith("top") || placement.startsWith("bottom")) {
            expect(style.right).toBe("20px");
          } else {
            expect(style.bottom).toBe("20px");
          }
        }
      }
    );
  });
});
