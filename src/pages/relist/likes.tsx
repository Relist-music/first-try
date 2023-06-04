import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';
import { ReactElement } from 'react';
import Layout from '@/layouts/layout';
import { PlaylistHeader } from '@/components/PlaylistMisc';
import FilteringContextProvider from '@/contexts/FilteringContext';
import BottomBar from '@/components/design-system/controls/BottomBar';
import RecommandationList from '@/components/Recommandations';
import RecommandationsContextProvider from '@/contexts/RecommandationContext';

const Likes = () => {
  const { liked, isLoading } = useAllLiked();
  console.log('liked', liked ?? []);
  return (
    <>
      <FilteringContextProvider list={liked ?? []}>
        <RecommandationsContextProvider list={liked ?? []}>
          <>
            <div className="topish h-screen flex flex-col p-2">
              <div className="top flex-grow basis-[400px] overflow-y-auto">
                <PlaylistHeader
                  title="Liked Songs"
                  imageUrl="/images/spotify-liked-image.png"
                />
                <div className="middle">
                  {!isLoading && liked && <Playlist />}
                </div>
              </div>

              <div className="bottom max-h-[240px] basis-[200px] border-red border-2 flex-grow-0 overflow-y-auto">
                <BottomBar>
                  <RecommandationList />
                </BottomBar>
              </div>
            </div>
          </>
        </RecommandationsContextProvider>
      </FilteringContextProvider>
    </>
  );
};

Likes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Likes;
