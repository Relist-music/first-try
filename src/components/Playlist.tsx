import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import { GenreAggregateV1 } from '@/types/myTypes';
import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';
import WebPlayback from './WebPlayback';

export type FilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filteredList: GenreAggregateV1[];
  setFilteredList: React.Dispatch<React.SetStateAction<GenreAggregateV1[]>>;
  overall: { [key: string]: number };
  setOverall: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
  tracksToPlayIds: string[];
  setTracksToPlayIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterContext = createContext<FilterContextType>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilters: () => {},
  filteredList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilteredList: () => {},
  overall: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOverall: () => {},
  useUmbrellaGenres: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUseUmbrellaGenres: () => {},
  tracksToPlayIds: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTracksToPlayIds: () => {},
});

const Playlist = ({ list }: { list: GenreAggregateV1[] }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [overall, setOverall] = useState<{ [key: string]: number }>({});
  const [filteredList, setFilteredList] = useState<GenreAggregateV1[]>(list);
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);
  const [tracksToPlayIds, setTracksToPlayIds] = useState<string[]>([]);
  const refToken = useRef<string | null>(null);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useLayoutEffect(() => {
    refToken.current = localStorage.getItem('access_token');
  }, []);

  useEffect(() => {
    const genresOverall = filteredList.reduce(
      (accumulator: { [key: string]: number }, richGenreTrack) => {
        richGenreTrack.genres.forEach((genre) => {
          accumulator[genre] = accumulator[genre] ? accumulator[genre] + 1 : 1;
        });
        return accumulator;
      },
      {},
    );

    setOverall(genresOverall);
  }, [filteredList]);

  useEffect(() => {
    setFilteredList([
      ...list.filter((richGenreTrack: GenreAggregateV1) => {
        if (filters.length === 0) return true;
        return filters.some((filter) => richGenreTrack.genres.includes(filter));
      }),
    ]);
  }, [filters, list]);

  const contextValue = useMemo(
    () => ({
      filters,
      setFilters,
      filteredList,
      setFilteredList,
      overall,
      setOverall,
      useUmbrellaGenres,
      setUseUmbrellaGenres,
      tracksToPlayIds,
      setTracksToPlayIds,
    }),
    [filters, filteredList, overall, useUmbrellaGenres, tracksToPlayIds],
  );

  useEffect(() => {
    console.log('tracksToPlayIds', tracksToPlayIds);
  }, [tracksToPlayIds]);

  return (
    <>
      <FilterContext.Provider value={contextValue}>
        <PlaylistHeader
          title="Liked Songs"
          imageUrl="/images/spotify-liked-image.png"
        />
        <br />
        <WebPlayback token={refToken.current} />
        <br />
        <GenreList />
        <br />
        <FilterList />
        <br />
        <PlaylistActions />
        <br />
        <PlaylistListTable />
      </FilterContext.Provider>
    </>
  );
};

export default Playlist;
