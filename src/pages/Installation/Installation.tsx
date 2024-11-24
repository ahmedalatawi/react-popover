import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import styles from "./Installation.module.scss";

const npmInstall = `npm install @atawi/react-popover`;

const yarnInstall = `yarn add @atawi/react-popover`;

const pnpmInstall = `pnpm add @atawi/react-popover`;

const basicUsage = `import { Popover } from '@atawi/react-popover';
import '@atawi/react-popover/dist/style.css'; // Optional: Import default styles

function App() {
  return (
    <Popover
      trigger={<button>Click me</button>}
      content={<div>Hello, World!</div>}
      placement="top"
    />
  );
}`;

const withTailwind = `// tailwind.config.js
module.exports = {
  content: [
    // ...
    './node_modules/@atawi/react-popover/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}`;

const withCSS = `/* styles.css */
.my-popover {
  /* Override default styles */
  --popover-bg: #ffffff;
  --popover-border: #e5e7eb;
  --popover-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --popover-radius: 0.5rem;
}`;

const customStyles = `<Popover
  trigger={<button>Styled Popover</button>}
  content={<div>Custom styled content</div>}
  className="my-popover"
  contentClassName="my-popover-content"
/>`;

export function Installation() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Installation</h1>
        <p>Get started with React Popover in your project.</p>
      </section>

      <section className={styles.section}>
        <h2>Package Installation</h2>
        <p>Install React Popover using your preferred package manager:</p>

        <div className={styles.tabs}>
          <h3>npm</h3>
          <CodeBlock code={npmInstall} language="bash" />

          <h3>yarn</h3>
          <CodeBlock code={yarnInstall} language="bash" />

          <h3>pnpm</h3>
          <CodeBlock code={pnpmInstall} language="bash" />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <p>Import and use the Popover component in your React application:</p>
        <CodeBlock code={basicUsage} />
      </section>

      <section className={styles.section}>
        <h2>Styling Options</h2>

        <div className={styles.option}>
          <h3>1. Default Styles</h3>
          <p>
            The component comes with a default styling that works out of the
            box. Just import the styles file if you want to use them.
          </p>
        </div>

        <div className={styles.option}>
          <h3>2. Tailwind CSS</h3>
          <p>
            If you're using Tailwind CSS, add the component's path to your
            content configuration:
          </p>
          <CodeBlock code={withTailwind} language="javascript" />
        </div>

        <div className={styles.option}>
          <h3>3. Custom CSS</h3>
          <p>Customize the appearance using CSS variables:</p>
          <CodeBlock code={withCSS} language="css" />
          <p>Apply your custom classes:</p>
          <CodeBlock code={customStyles} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Next Steps</h2>
        <div className={styles.nextSteps}>
          <Link to="/examples" className={styles.nextLink}>
            <div>
              <h3>View Examples →</h3>
              <p>Explore various use cases and implementations</p>
            </div>
          </Link>
          <Link to="/api" className={styles.nextLink}>
            <div>
              <h3>API Reference →</h3>
              <p>Learn about all available props and options</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
