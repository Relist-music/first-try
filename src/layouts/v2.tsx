import { Links } from '@/components/v2/Sidebar/Links';
import { PlayerV2 } from '@/components/v2/Sidebar/Player/Player';
import { ReactNode } from 'react';

export const V2 = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#0F1112] w-screen h-screen p-[0.6rem] flex gap-[0.3rem]">
      <div className="left flex flex-col gap-[0.3rem] h-full">
        <PlayerV2 />
        <Links />
      </div>
      <div className="right px-[20px] py-[40px] bg-[#1b2326] flex-1 rounded-[10px]">
        {children}
      </div>
    </div>
  );
};
