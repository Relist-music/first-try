import { useContext } from 'react';
import { RelistTrack } from '@/types/myTypes';
import { TableRow } from './TableItem';
import { TableCheckboxCell } from './TableItem/TableCell';
import { Switch } from '@headlessui/react';
import { FilteringContext } from '@/contexts/FilteringContext';

const TableHead = () => {
  const { useUmbrellaGenres, setUseUmbrellaGenres } =
    useContext(FilteringContext);
  return (
    <thead>
      <tr>
        {/* //TODO: add way to check all or uncheck all */}
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <TableCheckboxCell selected={false} setSelected={() => {}} />
        <th className="pb-2 text-left uppercase px-0">
          Title
          <hr />
        </th>
        <th className="pb-2  text-left uppercase max-w-[60rem]">
          Genres
          <Switch
            checked={useUmbrellaGenres}
            onChange={setUseUmbrellaGenres}
            className={`${
              useUmbrellaGenres ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                useUmbrellaGenres ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <hr />
        </th>
        <th className="pb-2 text-left uppercase">
          Time
          <hr />
        </th>
      </tr>
    </thead>
  );
};

const Table = () => {
  const { filteredList } = useContext(FilteringContext);

  return (
    <table className="table-auto">
      <TableHead />
      <tbody>
        {filteredList.map((track: RelistTrack) => {
          return <TableRow key={track.trackId} richGenreTrack={track} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
