import { PopoverPlacement, Coordinates } from './types';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ViewportBoundaries {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const WINDOW_PADDING = 8;
const SCROLL_BOUNDARY = 20;

const getViewportBoundaries = (): ViewportBoundaries => {
  return {
    top: WINDOW_PADDING,
    right: window.innerWidth - WINDOW_PADDING,
    bottom: window.innerHeight - WINDOW_PADDING,
    left: WINDOW_PADDING
  };
};

const getPreferredPlacements = (placement: PopoverPlacement): PopoverPlacement[] => {
  const basePlacements: Record<string, PopoverPlacement[]> = {
    'top': ['top', 'bottom', 'right', 'left'],
    'top-start': ['top-start', 'bottom-start', 'right-start', 'left-start'],
    'top-end': ['top-end', 'bottom-end', 'right-end', 'left-end'],
    'bottom': ['bottom', 'top', 'right', 'left'],
    'bottom-start': ['bottom-start', 'top-start', 'right-start', 'left-start'],
    'bottom-end': ['bottom-end', 'top-end', 'right-end', 'left-end'],
    'left': ['left', 'right', 'top', 'bottom'],
    'left-start': ['left-start', 'right-start', 'top-start', 'bottom-start'],
    'left-end': ['left-end', 'right-end', 'top-end', 'bottom-end'],
    'right': ['right', 'left', 'top', 'bottom'],
    'right-start': ['right-start', 'left-start', 'top-start', 'bottom-start'],
    'right-end': ['right-end', 'left-end', 'top-end', 'bottom-end']
  };

  return basePlacements[placement] || [placement];
};

const isOutOfBounds = (position: Coordinates, contentRect: Rect): boolean => {
  const boundaries = getViewportBoundaries();

  return (
    position.x < boundaries.left ||
    position.y < boundaries.top ||
    position.x + contentRect.width > boundaries.right ||
    position.y + contentRect.height > boundaries.bottom
  );
};

const isNearViewportEdge = (position: Coordinates, contentRect: Rect): boolean => {
  const boundaries = getViewportBoundaries();

  return (
    position.x < boundaries.left + SCROLL_BOUNDARY ||
    position.y < boundaries.top + SCROLL_BOUNDARY ||
    position.x + contentRect.width > boundaries.right - SCROLL_BOUNDARY ||
    position.y + contentRect.height > boundaries.bottom - SCROLL_BOUNDARY
  );
};

const calculateSinglePosition = (
  triggerRect: Rect,
  contentRect: Rect,
  placement: PopoverPlacement,
  offset: number
): Coordinates => {
  const positions: Record<PopoverPlacement, Coordinates> = {
    'top': {
      x: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
      y: triggerRect.top - contentRect.height - offset
    },
    'top-start': {
      x: triggerRect.left,
      y: triggerRect.top - contentRect.height - offset
    },
    'top-end': {
      x: triggerRect.left + triggerRect.width - contentRect.width,
      y: triggerRect.top - contentRect.height - offset
    },
    'bottom': {
      x: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
      y: triggerRect.top + triggerRect.height + offset
    },
    'bottom-start': {
      x: triggerRect.left,
      y: triggerRect.top + triggerRect.height + offset
    },
    'bottom-end': {
      x: triggerRect.left + triggerRect.width - contentRect.width,
      y: triggerRect.top + triggerRect.height + offset
    },
    'left': {
      x: triggerRect.left - contentRect.width - offset,
      y: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
    },
    'left-start': {
      x: triggerRect.left - contentRect.width - offset,
      y: triggerRect.top
    },
    'left-end': {
      x: triggerRect.left - contentRect.width - offset,
      y: triggerRect.top + triggerRect.height - contentRect.height
    },
    'right': {
      x: triggerRect.left + triggerRect.width + offset,
      y: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
    },
    'right-start': {
      x: triggerRect.left + triggerRect.width + offset,
      y: triggerRect.top
    },
    'right-end': {
      x: triggerRect.left + triggerRect.width + offset,
      y: triggerRect.top + triggerRect.height - contentRect.height
    }
  };

  return positions[placement];
};

export const calculatePosition = (
  triggerRect: Rect,
  contentRect: Rect,
  placement: PopoverPlacement,
  offset: number = 8,
  autoPlacement: boolean = false
): { position: Coordinates; finalPlacement: PopoverPlacement } => {
  let position = calculateSinglePosition(triggerRect, contentRect, placement, offset);
  let finalPlacement = placement;

  if (autoPlacement) {
    const preferredPlacements = getPreferredPlacements(placement);
    
    for (const testPlacement of preferredPlacements) {
      const testPosition = calculateSinglePosition(triggerRect, contentRect, testPlacement, offset);
      
      if (!isOutOfBounds(testPosition, contentRect) && !isNearViewportEdge(testPosition, contentRect)) {
        position = testPosition;
        finalPlacement = testPlacement;
        break;
      }
    }
  }

  // Final position adjustment to ensure popover stays within viewport
  const boundaries = getViewportBoundaries();
  position.x = Math.max(
    boundaries.left,
    Math.min(position.x, boundaries.right - contentRect.width)
  );
  position.y = Math.max(
    boundaries.top,
    Math.min(position.y, boundaries.bottom - contentRect.height)
  );

  return { position, finalPlacement };
};

export const getArrowStyle = (placement: PopoverPlacement): { top?: string; right?: string; bottom?: string; left?: string; transform: string } => {
  const baseTransform = 'rotate(45deg)';
  const offset = '-4px';

  const styles: Record<PopoverPlacement, { top?: string; right?: string; bottom?: string; left?: string; transform: string }> = {
    'top': { bottom: offset, left: '50%', transform: `translateX(-50%) ${baseTransform}` },
    'top-start': { bottom: offset, left: '20px', transform: baseTransform },
    'top-end': { bottom: offset, right: '20px', transform: baseTransform },
    'bottom': { top: offset, left: '50%', transform: `translateX(-50%) ${baseTransform}` },
    'bottom-start': { top: offset, left: '20px', transform: baseTransform },
    'bottom-end': { top: offset, right: '20px', transform: baseTransform },
    'left': { right: offset, top: '50%', transform: `translateY(-50%) ${baseTransform}` },
    'left-start': { right: offset, top: '20px', transform: baseTransform },
    'left-end': { right: offset, bottom: '20px', transform: baseTransform },
    'right': { left: offset, top: '50%', transform: `translateY(-50%) ${baseTransform}` },
    'right-start': { left: offset, top: '20px', transform: baseTransform },
    'right-end': { left: offset, bottom: '20px', transform: baseTransform }
  };

  return styles[placement];
};