import { describe, it, expect, vi, afterEach } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";
import "@testing-library/jest-dom";

describe("Popover Component", () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe("Basic Functionality", () => {
    it("renders trigger element", () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
        />
      );
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("shows content on click", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
        />
      );
      await userEvent.click(screen.getByText("Click me"));
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("hides content on outside click", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
        />
      );

      // Open popover
      await userEvent.click(screen.getByText("Click me"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("Trigger Types", () => {
    it("shows content on hover", async () => {
      render(
        <Popover
          trigger={<button>Hover me</button>}
          content={<div>Content</div>}
          triggerType="hover"
        />
      );

      vi.useFakeTimers();

      fireEvent.mouseEnter(screen.getByText("Hover me"));

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.getByText("Content")).toBeInTheDocument();

      fireEvent.mouseLeave(screen.getByText("Hover me"));

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("shows content on focus", async () => {
      render(
        <Popover
          trigger={<button>Focus me</button>}
          content={<div>Content</div>}
          triggerType="focus"
        />
      );

      const trigger = screen.getByText("Focus me");

      act(() => {
        trigger.focus();
      });

      expect(screen.getByText("Content")).toBeInTheDocument();

      act(() => {
        trigger.blur();
      });

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("handles multiple trigger types", async () => {
      render(
        <Popover
          trigger={<button>Trigger</button>}
          content={<div>Content</div>}
          triggerType={["click", "hover"]}
        />
      );

      // Test click
      await userEvent.click(screen.getByText("Trigger"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      // Close it
      fireEvent.mouseDown(document.body);

      vi.useFakeTimers();

      // Test hover
      fireEvent.mouseEnter(screen.getByText("Trigger"));

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled open state", async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
          open={false}
          onOpenChange={onOpenChange}
        />
      );

      await userEvent.click(screen.getByText("Click me"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      // Update to open state
      rerender(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
          open={true}
          onOpenChange={onOpenChange}
        />
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Close Behaviors", () => {
    it("closes on scroll when closeOnScroll is true", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
          closeOnScroll
        />
      );

      await userEvent.click(screen.getByText("Click me"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      fireEvent.scroll(window);
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("closes on resize when closeOnResize is true", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
          closeOnResize
        />
      );

      await userEvent.click(screen.getByText("Click me"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      fireEvent(window, new Event("resize"));
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("closes on escape key", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
        />
      );

      await userEvent.click(screen.getByText("Click me"));
      expect(screen.getByText("Content")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("Animation", () => {
    it("applies animation classes when animated prop is true", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={<div>Content</div>}
          animated
        />
      );

      await userEvent.click(screen.getByText("Click me"));

      const content = screen.getByText("Content").parentElement?.parentElement;

      // Open popover
      await waitFor(() => {
        expect(content?.getAttribute("class")).toMatch(/animated/gi);
        expect(content?.getAttribute("class")).toMatch(/enter/gi);
      });

      // fireEvent.mouseDown(document.body);

      // Close popover
      // FIXME: this
      // await waitFor(() => {
      //   expect(content?.getAttribute("class")).toMatch(/exit/gi);
      // });

      // expect(content).toHaveClass("exit");
    });
  });

  describe("Accessibility", () => {
    it("handles keyboard navigation", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={
            <div role="menu">
              <button>Option 1</button>
              <button>Option 2</button>
            </div>
          }
        />
      );

      const trigger = screen.getByText("Click me");

      // Open with Enter
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      expect(screen.getByText("Option 1")).toBeInTheDocument();

      // Close with Escape
      fireEvent.keyDown(trigger, { key: "Escape" });
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument();

      // Open with Space
      fireEvent.keyDown(trigger, { key: " " });
      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
      });
    });

    it("maintains focus trap within popover", async () => {
      render(
        <Popover
          trigger={<button>Click me</button>}
          content={
            <div>
              <button>First</button>
              <button>Second</button>
              <button>Third</button>
            </div>
          }
        />
      );

      await userEvent.click(screen.getByText("Click me"));
      await userEvent.click(screen.getByText("First"));

      expect(screen.getByText("First")).toHaveFocus();

      // Tab through buttons
      await userEvent.tab();
      expect(screen.getByText("Second")).toHaveFocus();

      await userEvent.tab();
      expect(screen.getByText("Third")).toHaveFocus();

      // Tab should cycle back to first button
      //FIXME: fix this
      // await userEvent.tab();
      // expect(screen.getByText("First")).toHaveFocus();
    });
  });
});
