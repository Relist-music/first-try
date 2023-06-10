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
      <GenreList />
      <br />
      <FilterList />
      <br />
      <PlaylistActions />
      <br />
      <PlaylistListTable />
      <ActionBar />
    </>
  );
};

export default Playlist;
