import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import styles from "./Accessibility.module.scss";

const ariaExample = `<Popover
  trigger={
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
    >
      Open Menu
    </button>
  }
  content={
    <div role="menu" aria-orientation="vertical">
      <button role="menuitem">Option 1</button>
      <button role="menuitem">Option 2</button>
    </div>
  }
/>`;

const keyboardExample = `// Keyboard navigation is automatically handled:
// - Enter/Space: Opens/closes the popover when trigger is focused
// - Tab: Moves focus through interactive elements
// - Escape: Closes the popover
// - Arrow keys: Navigates between menu items (when role="menu")

<Popover
  trigger={<button>Press Enter or Space</button>}
  content={
    <div role="menu">
      <button role="menuitem">Use Tab to reach me</button>
      <button role="menuitem">Press Escape to close</button>
    </div>
  }
/>`;

const focusManagementExample = `// Focus is automatically managed:
// - Focus is trapped within the popover when open
// - Focus returns to trigger when closed
// - First interactive element receives focus when opened

<Popover
  trigger={<button>Focus is managed</button>}
  content={
    <div>
      <button>I'll receive focus first</button>
      <button>Tab to me next</button>
    </div>
  }
/>`;

export function Accessibility() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Accessibility</h1>
        <p>
          The Popover component is built with accessibility in mind, following
          WAI-ARIA guidelines and best practices.
        </p>
      </section>

      <section className={styles.section}>
        <h2>ARIA Attributes</h2>
        <p>
          The component automatically manages appropriate ARIA attributes to
          ensure screen reader compatibility:
        </p>
        <CodeBlock code={ariaExample} />

        <div className={styles.features}>
          <h3>Automatic ARIA Support</h3>
          <ul>
            <li>
              <code>aria-haspopup</code>: Indicates that the trigger opens a
              popup
            </li>
            <li>
              <code>aria-expanded</code>: Reflects the open state of the popover
            </li>
            <li>
              <code>aria-controls</code>: Links the trigger to its content
            </li>
            <li>
              <code>role</code>: Appropriate ARIA roles based on content type
            </li>
            <li>
              <code>aria-hidden</code>: Manages content visibility for screen
              readers
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Keyboard Navigation</h2>
        <p>
          Full keyboard support ensures the component is operable without a
          mouse:
        </p>
        <CodeBlock code={keyboardExample} />

        <div className={styles.features}>
          <h3>Supported Keys</h3>
          <ul>
            <li>
              <kbd>Tab</kbd>: Navigate through interactive elements
            </li>
            <li>
              <kbd>Enter</kbd> / <kbd>Space</kbd>: Activate triggers and buttons
            </li>
            <li>
              <kbd>Escape</kbd>: Close the popover
            </li>
            <li>
              <kbd>↑</kbd> <kbd>↓</kbd>: Navigate menu items (when applicable)
            </li>
            <li>
              <kbd>Home</kbd> / <kbd>End</kbd>: Jump to first/last menu item
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Focus Management</h2>
        <p>
          Smart focus management ensures a smooth keyboard navigation
          experience:
        </p>
        <CodeBlock code={focusManagementExample} />

        <div className={styles.features}>
          <h3>Focus Features</h3>
          <ul>
            <li>Focus trap within open popovers</li>
            <li>Return focus to trigger on close</li>
            <li>Automatic focus of first interactive element</li>
            <li>Preserved focus state during updates</li>
            <li>Support for nested focusable elements</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Best Practices</h2>
        <div className={styles.practices}>
          <div className={styles.practice}>
            <h3>Content Structure</h3>
            <ul>
              <li>Use semantic HTML elements</li>
              <li>Provide descriptive labels</li>
              <li>Maintain logical tab order</li>
              <li>Include visible focus indicators</li>
            </ul>
          </div>

          <div className={styles.practice}>
            <h3>Visual Design</h3>
            <ul>
              <li>Ensure sufficient color contrast</li>
              <li>Make interactive elements obvious</li>
              <li>Provide visual feedback on interaction</li>
              <li>Support reduced motion preferences</li>
            </ul>
          </div>

          <div className={styles.practice}>
            <h3>Screen Readers</h3>
            <ul>
              <li>Meaningful content descriptions</li>
              <li>Announce state changes</li>
              <li>Clear navigation patterns</li>
              <li>Alternative text for visual elements</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
