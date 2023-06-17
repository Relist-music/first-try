import { V2 } from '@/layouts/v2';

const StylingLiked = () => {
  return (
    <V2>
      <div className="text-white">
        <div className="top">
          <h1 className="text-6xl font-bold">Liked Songs</h1>
        </div>
        <div className="tracks"></div>
        <div className="bottom"></div>
      </div>
    </V2>
  );
};

export default StylingLiked;
