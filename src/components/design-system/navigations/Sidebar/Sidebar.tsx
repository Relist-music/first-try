import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Sidebar.module.css';

// TODO: add cursor resize all the time during resizing
export const Sidebar = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback((event) => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left,
        );
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className={styles.sidebar}
      style={{ width: sidebarWidth }}
      // onMouseDown={(e) => e.preventDefault()}
    >
      <div className={styles.sidebarContent}>{children}</div>
      <div className={styles.sidebarResizer} onMouseDown={startResizing} />
    </div>
  );
};

export default Sidebar;
