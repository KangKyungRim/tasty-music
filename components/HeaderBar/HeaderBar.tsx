"use client";

import styles from "./HeaderBar.module.scss";
import { ReactNode, MouseEventHandler } from "react";

type SlotProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
};

function HeaderBar({ children }: { children: ReactNode }) {
  return <header className={styles.headerBar}>{children}</header>;
}

HeaderBar.Left = function Left({ children, onClick }: SlotProps) {
  return (
    <div className={styles.left} onClick={onClick}>
      {children}
    </div>
  );
};

HeaderBar.Center = function Center({ children, onClick }: SlotProps) {
  return (
    <h1 className={styles.center} onClick={onClick}>
      {children}
    </h1>
  );
};

HeaderBar.Right = function Right({ children, onClick }: SlotProps) {
  return (
    <div className={styles.right} onClick={onClick}>
      {children}
    </div>
  );
};

export default HeaderBar;