import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';
import { ReactElement } from 'react';
import Layout from '@/layouts/layout';
import { PlaylistHeader } from '@/components/PlaylistMisc';
import FilteringContextProvider, {
  FilteringContext,
} from '@/contexts/FilteringContext';
import BottomBar from '@/components/design-system/controls/BottomBar';
import { RecommandationList } from '@/components/Recommandations';
import RecommandationsContextProvider from '@/contexts/RecommandationContext';

const Likes = () => {
  const { liked, isLoading } = useAllLiked();
  return (
    <>
      <FilteringContextProvider list={liked ?? []}>
        <FilteringContext.Consumer>
          {({ filteredList }) => (
            <RecommandationsContextProvider list={filteredList ?? []}>
              <>
                <div className="topish h-screen flex flex-col">
                  <div className="top flex-grow basis-[400px] overflow-y-auto p-2">
                    <PlaylistHeader
                      title="Liked Songs"
                      imageUrl="/images/spotify-liked-image.png"
                    />
                    <div className="middle">
                      {!isLoading && liked && <Playlist />}
                    </div>
                  </div>
                  <BottomBar>
                    <RecommandationList />
                  </BottomBar>
                </div>
              </>
            </RecommandationsContextProvider>
          )}
        </FilteringContext.Consumer>
      </FilteringContextProvider>
    </>
  );
};

Likes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Likes;
