import {
  GenreList,
  FilterList,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

const Playlist = () => {
  return (
    <>
      <br />
      <GenreList />
      <br />
      <FilterList />
      <br />
      <PlaylistActions />
      <br />
      <PlaylistListTable />
    </>
  );
};

export default Playlist;
