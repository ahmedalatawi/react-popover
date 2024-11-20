import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import { Popover } from "../../components/Popover";
import { Settings, ChevronDown } from "lucide-react";
import styles from "./Home.module.scss";

const basicExample = `import { Popover } from '@atawi/react-popover';

function App() {
  return (
    <Popover
      trigger={<button>Click me</button>}
      content={<div>Popover content</div>}
      placement="top"
      animated
    />
  );
}`;

export function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>React Popover</h1>
        <p>
          A fully-featured, accessible, and customizable popover component for
          React applications.
        </p>

        <div className={styles.demo}>
          <Popover
            trigger={
              <button className={styles.demoButton}>
                <Settings />
                <span>Open Settings</span>
                <ChevronDown />
              </button>
            }
            content={
              <div className={styles.demoContent}>
                <h3>Settings</h3>
                <div className={styles.demoMenu}>
                  <button>Profile</button>
                  <button>Preferences</button>
                  <button>Security</button>
                  <button>Logout</button>
                </div>
              </div>
            }
            placement="bottom"
            animated
          />
        </div>

        <div className={styles.cta}>
          <Link to="/installation" className={styles.primary}>
            Get Started
          </Link>
          <Link to="/examples" className={styles.secondary}>
            View Examples
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Features</h2>
        <div className={styles.grid}>
          <div className={styles.feature}>
            <h3>🎯 Smart Positioning</h3>
            <p>
              12 placement options with intelligent auto-positioning to stay
              within viewport.
            </p>
          </div>
          <div className={styles.feature}>
            <h3>🎨 Customizable</h3>
            <p>
              Fully customizable styling with SCSS modules and custom class
              names.
            </p>
          </div>
          <div className={styles.feature}>
            <h3>♿ Accessible</h3>
            <p>
              WAI-ARIA compliant with keyboard navigation and screen reader
              support.
            </p>
          </div>
          <div className={styles.feature}>
            <h3>📱 Responsive</h3>
            <p>
              Mobile-friendly with touch support and responsive positioning.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.quickStart}>
        <h2>Quick Start</h2>
        <CodeBlock code={basicExample} />
        <Link to="/installation" className={styles.primary}>
          Read Installation Guide
        </Link>
      </section>
    </div>
  );
}
