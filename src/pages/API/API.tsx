import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import styles from "./API.module.scss";

const propsExample = `interface PopoverProps {
  // Required props
  trigger: ReactNode;
  content: ReactNode;
  
  // Optional props
  placement?: PopoverPlacement;
  offset?: number;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
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

type PopoverPlacement = 
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

type PopoverTrigger = 'click' | 'hover' | 'focus';`;

const controlledExample = `function ControlledPopover() {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover
      trigger={<button>Controlled</button>}
      content="Controlled content"
      open={open}
      onOpenChange={setOpen}
    />
  );
}`;

const stylingExample = `<Popover
  trigger={<button>Styled</button>}
  content="Custom styled content"
  className="my-popover"
  contentClassName="my-popover-content"
  style={{ maxWidth: '300px' }}
/>`;

export function API() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>API Reference</h1>
        <p>
          Comprehensive documentation of all props and options available in the
          Popover component.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Props</h2>
        <CodeBlock code={propsExample} language="typescript" />
      </section>

      <section className={styles.section}>
        <h2>Props Reference</h2>
        <div className={styles.propsTable}>
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>trigger</code>
                </td>
                <td>
                  <code>ReactNode</code>
                </td>
                <td>Required</td>
                <td>The element that triggers the popover</td>
              </tr>
              <tr>
                <td>
                  <code>content</code>
                </td>
                <td>
                  <code>ReactNode</code>
                </td>
                <td>Required</td>
                <td>The content to display in the popover</td>
              </tr>
              <tr>
                <td>
                  <code>placement</code>
                </td>
                <td>
                  <code>PopoverPlacement</code>
                </td>
                <td>
                  <code>'top'</code>
                </td>
                <td>Preferred placement of the popover</td>
              </tr>
              <tr>
                <td>
                  <code>offset</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>
                  <code>8</code>
                </td>
                <td>Distance between trigger and popover in pixels</td>
              </tr>
              <tr>
                <td>
                  <code>className</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>''</code>
                </td>
                <td>Additional class name for the popover wrapper</td>
              </tr>
              <tr>
                <td>
                  <code>containerClassName</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>''</code>
                </td>
                <td>Class name for the container element</td>
              </tr>
              <tr>
                <td>
                  <code>contentClassName</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>
                  <code>''</code>
                </td>
                <td>Class name for the content wrapper</td>
              </tr>
              <tr>
                <td>
                  <code>open</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>undefined</code>
                </td>
                <td>Control popover visibility (controlled mode)</td>
              </tr>
              <tr>
                <td>
                  <code>onOpenChange</code>
                </td>
                <td>
                  <code>(open: boolean) =&gt; void</code>
                </td>
                <td>
                  <code>undefined</code>
                </td>
                <td>Callback when visibility changes</td>
              </tr>
              <tr>
                <td>
                  <code>style</code>
                </td>
                <td>
                  <code>CSSProperties</code>
                </td>
                <td>
                  <code>undefined</code>
                </td>
                <td>Additional inline styles for the popover</td>
              </tr>
              <tr>
                <td>
                  <code>autoPlacement</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Enable automatic repositioning</td>
              </tr>
              <tr>
                <td>
                  <code>animated</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Enable enter/exit animations</td>
              </tr>
              <tr>
                <td>
                  <code>triggerType</code>
                </td>
                <td>
                  <code>PopoverTrigger | PopoverTrigger[]</code>
                </td>
                <td>
                  <code>'click'</code>
                </td>
                <td>How to trigger the popover</td>
              </tr>
              <tr>
                <td>
                  <code>hoverDelay</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>
                  <code>200</code>
                </td>
                <td>Delay before showing on hover (ms)</td>
              </tr>
              <tr>
                <td>
                  <code>closeDelay</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>
                  <code>400</code>
                </td>
                <td>Delay before hiding on hover out (ms)</td>
              </tr>
              <tr>
                <td>
                  <code>closeOnScroll</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Close popover when window is scrolled</td>
              </tr>
              <tr>
                <td>
                  <code>closeOnResize</code>
                </td>
                <td>
                  <code>boolean</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Close popover when window is resized</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Controlled Mode</h2>
        <p>
          Use the <code>open</code> and <code>onOpenChange</code> props to
          control the popover's visibility state:
        </p>
        <CodeBlock code={controlledExample} />
      </section>

      <section className={styles.section}>
        <h2>Styling</h2>
        <p>The component provides several ways to customize its appearance:</p>
        <CodeBlock code={stylingExample} />

        <div className={styles.customization}>
          <h3>CSS Classes</h3>
          <ul>
            <li>
              <code>className</code>: Styles the root wrapper
            </li>
            <li>
              <code>containerClassName</code>: Styles the container element
            </li>
            <li>
              <code>contentClassName</code>: Styles the content wrapper
            </li>
          </ul>

          <h3>CSS Variables</h3>
          <ul>
            <li>
              <code>--popover-bg</code>: Background color
            </li>
            <li>
              <code>--popover-border</code>: Border color
            </li>
            <li>
              <code>--popover-shadow</code>: Box shadow
            </li>
            <li>
              <code>--popover-radius</code>: Border radius
            </li>
            <li>
              <code>--popover-z-index</code>: Z-index value
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
