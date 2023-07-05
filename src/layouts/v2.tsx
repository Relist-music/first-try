'use client';

import { Links } from '@/components/v2/Sidebar/Links';
import { PlayerV2 } from '@/components/v2/Sidebar/Player/Player';
import { ReactNode } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export const V2 = ({
  children,
  defaultLayout = [17, 83],
}: {
  children: ReactNode;
  defaultLayout?: number[] | undefined;
}) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  let storage;
  if (typeof localStorage !== 'undefined') {
    storage = localStorage;
  }

  return (
    <div className="bg-[#0F1112] w-screen h-screen p-[0.6rem] flex gap-[0.3rem]">
      <PanelGroup
        id="panel-group"
        onLayout={onLayout}
        direction="horizontal"
        storage={storage}
      >
        <Panel minSize={10} defaultSize={defaultLayout[0]} id="left-panel">
          <div className="left flex flex-col gap-[0.3rem] h-full">
            <PlayerV2 />
            <Links />
          </div>
        </Panel>
        <PanelResizeHandle id="resize-handle">
          <div className="h-full w-4 "></div>
        </PanelResizeHandle>
        <Panel minSize={50} defaultSize={defaultLayout[1]} id="right-panel">
          <div className="right px-[20px] py-[40px] bg-[#1b2326] flex-1 rounded-[10px] h-full">
            {children}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default V2;
