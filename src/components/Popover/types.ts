import { CSSProperties, ReactNode } from "react";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type PopoverTrigger = "click" | "hover" | "focus";

export interface Coordinates {
  x: number;
  y: number;
}

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?: PopoverPlacement;
  offset?: number;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  animatedClassName?: string;
  enterClassName?: string;
  exitClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
  autoPlacement?: boolean;
  animated?: boolean;
  triggerType?: PopoverTrigger | PopoverTrigger[];
  hoverDelay?: number;
  closeDelay?: number;
  closeOnScroll?: boolean;
  closeOnResize?: boolean;
}
