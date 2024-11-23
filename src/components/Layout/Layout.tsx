import { NavLink, Outlet } from "react-router-dom";
import { Github } from "lucide-react";
import styles from "./Layout.module.scss";

export function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>React Popover</h1>
          <nav>
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/installation">Installation</NavLink>
            <NavLink to="/examples">Examples</NavLink>
            <NavLink to="/api">API</NavLink>
            <NavLink to="/accessibility">Accessibility</NavLink>
          </nav>
          <a
            href="https://github.com/ahmedalatawi/react-popover"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            <Github />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© {new Date().getFullYear()} React Popover. MIT License.</p>
        </div>
      </footer>
    </div>
  );
}
