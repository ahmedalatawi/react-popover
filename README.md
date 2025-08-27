![](https://github.com/AhmedAlatawi/react-popover/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/github/ahmedalatawi/react-popover/graph/badge.svg?token=8MBZ57Y4WA)](https://codecov.io/github/ahmedalatawi/react-popover)
[![License: MIT](https://img.shields.io/github/license/AhmedAlatawi/react-popover)](https://github.com/AhmedAlatawi/react-popover/blob/master/LICENSE)

# React Popover Component

A lightweight, fully-featured, accessible, and customizable popover component for React apps.

## Features

- 🎯 12 placement options with smart auto-positioning
- 🎨 Smooth animations and transitions
- 🔄 Multiple trigger types (click, hover, focus)
- 📱 Responsive and mobile-friendly
- ♿ Accessible (WAI-ARIA compliant)
- 🎛️ Controlled and uncontrolled modes
- 🎯 Auto-placement to stay within viewport
- 🖌️ Highly customizable styling
- 📦 TypeScript support
- ⚡ Optimized performance
- ❌ No external dependencies

### [API documentation website](https://react-popover.netlify.app/)

## Installation

```bash
npm install @atawi/react-popover
```

## Basic Usage

```tsx
import { Popover } from "@atawi/react-popover";
import "@atawi/react-popover/dist/style.css"; // Optional: Import default styles

function App() {
  return (
    <Popover
      trigger={<button>Click me</button>}
      content={<div>Popover content</div>}
      placement="top"
    />
  );
}
```

## Props

| Prop                 | Type                                 | Default   | Description                           |
| -------------------- | ------------------------------------ | --------- | ------------------------------------- |
| `trigger`            | `ReactNode`                          | -         | The element that triggers the popover |
| `content`            | `ReactNode`                          | -         | The content to display in the popover |
| `placement`          | `PopoverPlacement`                   | `'top'`   | Preferred placement of the popover    |
| `offset`             | `number`                             | `8`       | Distance between trigger and popover  |
| `className`          | `string`                             | `''`      | Class name for the popover wrapper    |
| `containerClassName` | `string`                             | `''`      | Class name for the container          |
| `contentClassName`   | `string`                             | `''`      | Class name for the content wrapper    |
| `animatedClassName`  | `string`                             | `''`      | Custom class name for animated state  |
| `enterClassName`     | `string`                             | `''`      | Custom class name for enter animation |
| `exitClassName`      | `string`                             | `''`      | Custom class name for exit animation  |
| `open`               | `boolean`                            | -         | Control popover visibility externally |
| `onOpenChange`       | `(open: boolean) => void`            | -         | Callback when visibility changes      |
| `style`              | `CSSProperties`                      | -         | Additional styles for the popover     |
| `autoPlacement`      | `boolean`                            | `false`   | Enable automatic repositioning        |
| `animated`           | `boolean`                            | `false`   | Enable enter/exit animations          |
| `triggerType`        | `PopoverTrigger \| PopoverTrigger[]` | `'click'` | How to trigger the popover            |
| `hoverDelay`         | `number`                             | `200`     | Delay before showing on hover         |
| `closeDelay`         | `number`                             | `400`     | Delay before hiding on hover out      |
| `closeOnScroll`      | `boolean`                            | `false`   | Close popover when window is scrolled |
| `closeOnResize`      | `boolean`                            | `false`   | Close popover when window is resized  |

## Examples

### Basic Popover

```tsx
<Popover
  trigger={<button>Click me</button>}
  content="Simple popover content"
  placement="top"
/>
```

### With Auto-placement

```tsx
<Popover
  trigger={<button>Hover me</button>}
  content="Content that stays in viewport"
  placement="top"
  autoPlacement
  triggerType="hover"
/>
```

### Animated Popover

```tsx
<Popover
  trigger={<button>Animated</button>}
  content="Smooth animation"
  placement="right"
  animated
/>
```

### Multiple Triggers

```tsx
<Popover
  trigger={<button>Interactive</button>}
  content="Accessible content"
  placement="bottom"
  triggerType={["hover", "focus"]}
/>
```

### Controlled Mode

```tsx
function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<button>Controlled</button>}
      content="Controlled content"
      open={open}
      onOpenChange={setOpen}
    />
  );
}
```

### Custom Styling

```tsx
<Popover
  trigger={<button>Styled</button>}
  content="Custom styled content"
  className="custom-popover"
  contentClassName="custom-content"
  style={{ maxWidth: "300px" }}
/>
```

### Custom Animations

```tsx
<Popover
  trigger={<button>Custom Animation</button>}
  content="Smoothly animated content"
  animated
  animatedClassName="my-popover-animated"
  enterClassName="my-popover-enter"
  exitClassName="my-popover-exit"
/>
```

```css
.my-popover-animated {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.my-popover-enter {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.my-popover-exit {
  opacity: 0;
  transform: scale(0.9) translateY(-8px);
}
```

## Placement Options

The `placement` prop accepts the following values:

- `top` | `top-start` | `top-end`
- `bottom` | `bottom-start` | `bottom-end`
- `left` | `left-start` | `left-end`
- `right` | `right-start` | `right-end`

## Trigger Types

The `triggerType` prop accepts:

- `'click'` - Opens on click/tap
- `'hover'` - Opens on mouse hover
- `'focus'` - Opens on focus (keyboard navigation)
- Array of the above for multiple triggers

## Styling

The component uses CSS modules and provides several class names for customization:

- `.container` - The root container
- `.trigger` - The trigger wrapper
- `.content` - The popover content wrapper
- `.contentInner` - The inner content container
- `.animated` - Applied when animations are enabled
- `.enter` - Applied during enter animation
- `.exit` - Applied during exit animation

## Custom Animation Classes

For complete control over animations, use the animation className props:

- `animatedClassName` - Replaces the default animated class
- `enterClassName` - Replaces the default enter class
- `exitClassName` - Replaces the default exit class

This allows you to bypass CSS modules hashing and use your own class names.

## Accessibility

The component follows WAI-ARIA guidelines:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with polyfills)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT © Atawi
