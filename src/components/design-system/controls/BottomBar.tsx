import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';

const BottomBarStyled = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 0px;
  max-height: 400px;
  overflow-y: auto;
  .bottomBarResizer {
    min-height: 6px;
    background-color: red;
    width: 100%;
    &:hover {
      cursor: row-resize;
    }
  }
`;

export const BottomBar = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}) => {
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [mouseDownPoint, setMouseDownPoint] = useState<number>(NaN);
  const [isResizing, setIsResizing] = useState(false);
  const [bottomBarHeight, setBottomBarHeight] = useState(200);

  const startResizing = useCallback((mouseDownEvent) => {
    setMouseDownPoint(mouseDownEvent.clientY);
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback((event) => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing && bottomBarRef.current) {
        console.log(
          'mouseMoveEvent.clientY',
          mouseDownPoint + (mouseDownPoint - mouseMoveEvent.clientY),
        );
        setBottomBarHeight(
          mouseDownPoint + (mouseDownPoint - mouseMoveEvent.clientY),
        );
      }
    },
    [isResizing, mouseDownPoint],
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
    <BottomBarStyled ref={bottomBarRef} style={{ height: bottomBarHeight }}>
      <div className="bottomBarResizer" onMouseDown={startResizing} />
      <h1>BottomBar</h1>
      <div>{children}</div>
    </BottomBarStyled>
  );
};

export default BottomBar;
