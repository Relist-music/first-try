import { TrackItem } from '@/components/v2/Track/Item/TrackItem';
import { V2 } from '@/layouts/v2';
import styled from '@emotion/styled';

const LikedStyles = styled.div`
  color: white;
  .tracks {
    display: grid;
    grid-template-columns: 2fr 5fr 4fr 2fr 1fr;
  }
`;

const StylingLiked = () => {
  return (
    <V2>
      <LikedStyles>
        <div className="top">
          <h1 className="text-6xl font-bold">Lieked Songs</h1>
        </div>
        <div className="tracks">
          <TrackItem />
        </div>
        <div className="bottom"></div>
      </LikedStyles>
    </V2>
  );
};

export default StylingLiked;
