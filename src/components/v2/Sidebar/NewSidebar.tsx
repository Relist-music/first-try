import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PlayerV2 } from './Player/Player';
import { Links } from './Links';

const NewSidebar = () => {
  console.log('ok');
  return (
    <div className="left flex flex-col gap-[0.3rem] h-full">
      <PanelGroup id="sidebar-panel-group" direction="vertical">
        <Panel minSize={30} maxSize={60} id="player">
          <PlayerV2 />
        </Panel>
        <PanelResizeHandle id="resize-player-handle">
          <div className="h-1 w-full hover:bg-purple-600"></div>
        </PanelResizeHandle>
        <Panel minSize={30} maxSize={60} id="sidebar-links">
          <Links />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default NewSidebar;
