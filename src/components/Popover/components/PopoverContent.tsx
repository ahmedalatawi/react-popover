import React, { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { calculatePosition } from "../utils/utils";
import type { PopoverProps, Coordinates, PopoverPlacement } from "../types";
import styles from "./Popover.module.scss";

interface PopoverContentProps extends Omit<PopoverProps, "trigger"> {
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: (element: HTMLDivElement | null) => void;
  isOpen: boolean;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  content,
  placement = "top",
  offset = 8,
  className = "",
  contentClassName = "",
  triggerRef,
  contentRef,
  isOpen,
  style,
  autoPlacement = false,
  animated = false,
}) => {
  const localContentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const [currentPlacement, setCurrentPlacement] =
    useState<PopoverPlacement>(placement);
  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const animationFrameRef = useRef<number>();
  const hiddenContentRef = useRef<HTMLDivElement>(null);

  // Merge the external ref with our local ref
  const setRefs = useCallback(
    (element: HTMLDivElement | null) => {
      localContentRef.current = element;
      if (typeof contentRef === "function") {
        contentRef(element);
      } else if (contentRef) {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current =
          element;
      }
    },
    [contentRef]
  );

  const calculateInitialPosition = useCallback(() => {
    if (!triggerRef.current || !hiddenContentRef.current) return false;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = hiddenContentRef.current.getBoundingClientRect();

    const { position: newPosition, finalPlacement } = calculatePosition(
      triggerRect,
      contentRect,
      placement,
      offset,
      autoPlacement
    );

    setPosition(newPosition);
    setCurrentPlacement(finalPlacement);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, offset, autoPlacement]);

  useEffect(() => {
    if (isOpen && !isPositioned) {
      const positioned = calculateInitialPosition();
      if (positioned) {
        setIsPositioned(true);
        // Small delay to ensure smooth animation
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    } else if (!isOpen) {
      setIsVisible(false);
      setIsPositioned(false);
      const timer = setTimeout(() => {
        setPosition({ x: 0, y: 0 });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isPositioned, calculateInitialPosition]);

  const updatePosition = useCallback(() => {
    if (isOpen && triggerRef.current && localContentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = localContentRef.current.getBoundingClientRect();

      const { position: newPosition, finalPlacement } = calculatePosition(
        triggerRect,
        contentRect,
        placement,
        offset,
        autoPlacement
      );

      setPosition(newPosition);
      setCurrentPlacement(finalPlacement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, placement, offset, autoPlacement]);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    const handleResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    if (isOpen && isPositioned) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, isPositioned, updatePosition]);

  // Hidden content for initial measurement
  const hiddenContent = (
    <div
      ref={hiddenContentRef}
      style={{
        position: "fixed",
        visibility: "hidden",
        pointerEvents: "none",
        top: 0,
        left: 0,
      }}
    >
      <div className={styles.contentInner}>{content}</div>
    </div>
  );

  const contentClasses = [
    styles.content,
    animated && styles.animated,
    animated && (isVisible ? styles.enter : styles.exit),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentInnerClasses = [styles.contentInner, contentClassName]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <>
      {isOpen && !isPositioned && hiddenContent}
      {(isOpen || isVisible) && (
        <div
          ref={setRefs}
          className={contentClasses}
          style={{
            ...style,
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 50,
            opacity: isPositioned ? undefined : 0,
            pointerEvents: isPositioned ? undefined : "none",
            willChange: "transform, opacity",
          }}
          data-testid="popover-content"
        >
          <div
            className={contentInnerClasses}
            data-placement={currentPlacement}
          >
            {content}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
