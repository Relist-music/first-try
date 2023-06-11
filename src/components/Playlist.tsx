import {
  GenreList,
  FilterList,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';
import ActionBar from './PlaylistMisc/Lists/TableItem/TableActionBar/ActionBar';

const Playlist = () => {
  return (
    <>
      <br />
      <PlaylistActions />
      <br />
      <GenreList />
      <br />
      <FilterList />
      <br />
      <PlaylistListTable />
      <ActionBar />
    </>
  );
};

export default Playlist;
