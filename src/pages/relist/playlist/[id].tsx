import Playlist from '@/components/Playlist';
import { PlaylistHeader } from '@/components/PlaylistMisc';
import { RecommandationList } from '@/components/Recommandations';
import BottomBar from '@/components/design-system/controls/BottomBar';
import FilteringContextProvider, {
  FilteringContext,
} from '@/contexts/FilteringContext';
import RecommandationsContextProvider from '@/contexts/RecommandationContext';
import usePlaylist from '@/hooks/usePlaylist';
import Layout from '@/layouts/layout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const PlaylistId = () => {
  // const [playlistTrackObjects, setPlaylistTrackObjects] = useState<
  //   PlaylistTrackObject[]
  // >([]);
  const router = useRouter();
  const { id } = router.query;
  // useEffect(() => {
  //   if (!id) return;
  //   if (typeof id !== 'string') return;
  //   (async () => {
  //     const { tracks } = await fetchPlaylist({ playlistId: id });
  //     setPlaylistTrackObjects(tracks.items);
  //   })();
  // }, [id]);
  const playlistId = id
    ? ((Array.isArray(id) ? id.at(0) : id) as string)
    : ('' as string);
  const { RelistPlaylistTracks, isLoading } = usePlaylist({ playlistId });
  console.log('id', id, playlistId);
  return (
    <div>
      <>
        <FilteringContextProvider list={RelistPlaylistTracks ?? []}>
          <FilteringContext.Consumer>
            {({ filteredList }) => (
              <RecommandationsContextProvider list={filteredList ?? []}>
                <>
                  <div className="topish h-screen flex flex-col">
                    <div className="top flex-grow basis-[400px] overflow-y-auto p-2">
                      <PlaylistHeader
                        title={`Playlist ${playlistId}`}
                        imageUrl="/images/spotify-liked-image.png"
                      />
                      <div className="middle">
                        {!isLoading && RelistPlaylistTracks && <Playlist />}
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
    </div>
  );
};

PlaylistId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlaylistId;
