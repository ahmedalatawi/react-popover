import React, { useRef, useState, useCallback, useEffect } from "react";
import { useClickOutside } from "../hooks/hooks";
import { PopoverContent } from "./PopoverContent";
import type { PopoverProps } from "../types";
import styles from "./Popover.module.scss";

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = "top",
  offset,
  className = "",
  containerClassName = "",
  contentClassName = "",
  arrowClassName = "",
  open,
  onOpenChange,
  style,
  autoPlacement = false,
  animated = false,
  triggerType = "click",
  hoverDelay = 200,
  closeDelay = 400,
  closeOnScroll = false,
  closeOnResize = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  //@ts-expect-error ignore
  const timeoutRef = useRef<NodeJS.Timeout>();
  //@ts-expect-error ignore
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const triggers = Array.isArray(triggerType) ? triggerType : [triggerType];
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const isHoverEnabled = triggers.includes("hover");

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = undefined;
    }
  }, []);

  const handleOpen = useCallback(() => {
    clearTimeouts();
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, onOpenChange, clearTimeouts]);

  const handleClose = useCallback(() => {
    clearTimeouts();
    if (isHoverEnabled) {
      timeoutRef.current = setTimeout(() => {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setInternalOpen(false);
        }
      }, closeDelay);
    } else {
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setInternalOpen(false);
      }
    }
  }, [isControlled, onOpenChange, closeDelay, clearTimeouts, isHoverEnabled]);

  const handleToggle = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    },
    [isOpen, handleOpen, handleClose]
  );

  useClickOutside(
    [triggerRef, contentRef],
    handleClose,
    isOpen && triggers.includes("click")
  );

  useEffect(() => {
    const handleScroll = () => {
      if (closeOnScroll && isOpen) {
        handleClose();
      }
    };

    const handleResize = () => {
      if (closeOnResize && isOpen) {
        handleClose();
      }
    };

    if (closeOnScroll) {
      window.addEventListener("scroll", handleScroll, true);
    }
    if (closeOnResize) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (closeOnScroll) {
        window.removeEventListener("scroll", handleScroll, true);
      }
      if (closeOnResize) {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeouts();
    };
  }, [closeOnScroll, closeOnResize, isOpen, handleClose, clearTimeouts]);

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {
    //@ts-expect-error ignore
    ref: triggerRef,
    className: styles.trigger,
    "data-testid": "popover-trigger",
  };

  if (triggers.includes("click")) {
    triggerProps.onClick = handleToggle;
  }

  if (isHoverEnabled) {
    triggerProps.onMouseEnter = () => {
      clearTimeouts();
      hoverTimeoutRef.current = setTimeout(handleOpen, hoverDelay);
    };
    triggerProps.onMouseLeave = handleClose;
  }

  if (triggers.includes("focus")) {
    triggerProps.onFocus = handleOpen;
    triggerProps.onBlur = handleClose;
    triggerProps.tabIndex = 0;
  }

  return (
    <div
      className={`${styles.container} ${containerClassName}`}
      data-testid="popover-container"
      onMouseEnter={
        isHoverEnabled
          ? () => {
              if (isOpen) {
                clearTimeouts();
              }
            }
          : undefined
      }
      onMouseLeave={isHoverEnabled ? handleClose : undefined}
    >
      <div {...triggerProps}>{trigger}</div>
      <PopoverContent
        content={content}
        placement={placement}
        offset={offset}
        className={className}
        contentClassName={contentClassName}
        arrowClassName={arrowClassName}
        triggerRef={triggerRef}
        contentRef={contentRef}
        isOpen={isOpen}
        style={style}
        autoPlacement={autoPlacement}
        animated={animated}
      />
    </div>
  );
};
