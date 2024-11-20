import { useState } from "react";
import { Popover, PopoverPlacement } from "../../components/Popover";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import {
  Settings,
  Bell,
  User,
  LogOut,
  Heart,
  Star,
  HelpCircle,
  ChevronDown,
  Compass,
} from "lucide-react";
import styles from "./Examples.module.scss";

const basicExample = `<Popover
  trigger={<button>Click me</button>}
  content={<div>Basic Popover Content</div>}
  placement="top"
/>`;

const placementExample = `<Popover
  trigger={<button>Hover me</button>}
  content={<div>Smart placement that stays in viewport</div>}
  placement="right"
  triggerType="hover"
  autoPlacement
/>`;

const notificationExample = `<Popover
  trigger={
    <button className="icon-button">
      <Bell />
    </button>
  }
  content={
    <div className="notifications">
      <h3>Notifications</h3>
      <div className="notification">
        <Heart />
        <div>
          <p>John liked your post</p>
          <span>2 minutes ago</span>
        </div>
      </div>
    </div>
  }
  placement="bottom-end"
  animated
/>`;

const menuExample = `<Popover
  trigger={
    <button className="menu-button">
      <User />
      <span>Profile</span>
      <ChevronDown />
    </button>
  }
  content={
    <div className="menu">
      <button>Settings</button>
      <button>Help</button>
      <button>Logout</button>
    </div>
  }
  placement="bottom"
  closeOnScroll
/>`;

export function Examples() {
  const [placement, setPlacement] = useState<PopoverPlacement>("top");

  const placements: PopoverPlacement[] = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ];

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Examples</h1>
        <p>
          Explore different use cases and implementations of the Popover
          component.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <p>A simple popover with default settings.</p>

        <div className={styles.demo}>
          <div className={styles.example}>
            <Popover
              trigger={<button className={styles.button}>Click me</button>}
              content={
                <div className={styles.content}>
                  <p>Basic Popover Content</p>
                </div>
              }
              placement="top"
            />
          </div>
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Placement Examples</h2>
        <p>
          The popover supports 12 different placement options. Click the buttons
          to see each placement in action.
        </p>

        <div className={styles.demo}>
          <div className={styles.placementGrid}>
            <div className={styles.placementCenter}>
              <Popover
                trigger={
                  <button className={styles.compass}>
                    <Compass />
                  </button>
                }
                content={
                  <div className={styles.placementContent}>
                    <h4>Center Reference</h4>
                    <p>
                      Click the buttons around to see different placements,
                      current: {placement}
                    </p>
                  </div>
                }
                placement="top"
                animated
                triggerType="hover"
              />
            </div>
            {placements.map((p) => (
              <div
                key={p}
                className={styles[`placement-${p.replace("-", "")}`]}
              >
                <Popover
                  trigger={
                    <button
                      className={`${styles.placementButton} ${
                        placement === p ? styles.active : ""
                      }`}
                      onClick={() => setPlacement(p)}
                    >
                      {p}
                    </button>
                  }
                  content={
                    <div className={styles.placementContent}>
                      <h4>Placement: {p}</h4>
                      <p>This popover is positioned at {p}</p>
                    </div>
                  }
                  placement={p}
                  animated
                  autoPlacement
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Smart Placement</h2>
        <p>
          The popover automatically adjusts its position to stay within the
          viewport.
        </p>

        <div className={styles.demo}>
          <div className={styles.example}>
            <Popover
              trigger={<button className={styles.button}>Hover me</button>}
              content={
                <div className={styles.content}>
                  <p>This popover will adjust its position to stay visible</p>
                </div>
              }
              placement="right"
              triggerType="hover"
              autoPlacement
            />
          </div>
          <CodeBlock code={placementExample} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notification Panel</h2>
        <p>
          A more complex example showing a notification panel with custom
          styling.
        </p>

        <div className={styles.demo}>
          <div className={styles.example}>
            <Popover
              trigger={
                <button className={styles.iconButton}>
                  <Bell />
                </button>
              }
              content={
                <div className={styles.notifications}>
                  <h3>Notifications</h3>
                  <div className={styles.notification}>
                    <Heart className={styles.icon} />
                    <div>
                      <p className={styles.title}>John liked your post</p>
                      <span className={styles.time}>2 minutes ago</span>
                    </div>
                  </div>
                  <div className={styles.notification}>
                    <Star className={styles.icon} />
                    <div>
                      <p className={styles.title}>New feature available</p>
                      <span className={styles.time}>1 hour ago</span>
                    </div>
                  </div>
                </div>
              }
              placement="bottom-end"
              animated
            />
          </div>
          <CodeBlock code={notificationExample} />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Menu Dropdown</h2>
        <p>A dropdown menu with multiple options and icons.</p>

        <div className={styles.demo}>
          <div className={styles.example}>
            <Popover
              trigger={
                <button className={styles.menuButton}>
                  <User />
                  <span>Profile</span>
                  <ChevronDown />
                </button>
              }
              content={
                <div className={styles.menu}>
                  <button>
                    <Settings />
                    Settings
                  </button>
                  <button>
                    <HelpCircle />
                    Help
                  </button>
                  <button>
                    <LogOut />
                    Logout
                  </button>
                </div>
              }
              placement="bottom"
              closeOnScroll
            />
          </div>
          <CodeBlock code={menuExample} />
        </div>
      </section>
    </div>
  );
}
