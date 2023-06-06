import { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';

const BottomBarContainer = styled.div`
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 2px solid gray;
  background-color: white;
`;

const Resizer = styled.div`
  min-height: 5px;
  height: 10px;
  cursor: ns-resize;
  background-color: gray;
  width: 100%;
  display: block;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: white;
  padding: 8px 4px;
`;

export const BottomBar = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}) => {
  const barRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [barHeight, setBarHeight] = useState(240);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing && barRef.current) {
        const newHeight = window.innerHeight - mouseMoveEvent.clientY;
        if (newHeight >= 0 && newHeight <= 640) {
          setBarHeight(newHeight);
        }
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
    <BottomBarContainer ref={barRef} style={{ height: barHeight }}>
      <Resizer onMouseDown={startResizing} />
      <Content>{children}</Content>
    </BottomBarContainer>
  );
};

export default BottomBar;
