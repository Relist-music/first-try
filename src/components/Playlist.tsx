import { useEffect, useState } from 'react';
import { RelistTrack } from '@/types/myTypes';

import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

import { useCountedGenres, useFilterList } from '@/hooks/filters';
import { FilteringContext } from '@/contexts/filteringContext';
import { pickRandomEntries } from '@/utils/pickRandomEntries';
import fetchRecommandations from '@/services/spotify/fetchRecommandations';
import { RecommendationsSeedObject } from '@/types/spotify-node-api';
import { mapRecommendationTrackObjectToGenreAggregate } from '@/utils/mapRecommendationTrackObjectToGenreAggregate';

const Playlist = ({ list }: { list: RelistTrack[] }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [umbrellaGenres, setUmbrellaGenres] = useState<string[]>([]);
  const { countedGenres, setCountedGenres } = useCountedGenres(list);
  const { filteredList, setFilteredList } = useFilterList({ list, filters });
  const [recommandationList, setRecommandationList] = useState<RelistTrack[]>(
    [],
  );
  const [recommandationSeeds, setRecommandationSeeds] = useState<
    RecommendationsSeedObject[]
  >([]);
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);

  const filterContextValue = {
    filters,
    setFilters,

    umbrellaGenres,
    setUmbrellaGenres,

    filteredList,
    setFilteredList,

    recommandationList,
    setRecommandationList,

    recommandationSeeds,
    setRecommandationSeeds,

    countedGenres,
    setCountedGenres,

    useUmbrellaGenres,
    setUseUmbrellaGenres,
  };

  useEffect(() => {
    (async () => {
      const selectedAggregates = pickRandomEntries(filteredList, 5);
      const { tracks, seeds } = await fetchRecommandations({
        seed_tracks: selectedAggregates
          .map((aggregate) => aggregate.trackId)
          .join(','),
        seed_genres: '',
        seed_artists: '',
      });
      const recommandationListRelist = tracks.map((track, index) =>
        mapRecommendationTrackObjectToGenreAggregate(track, index),
      );

      setRecommandationList(recommandationListRelist);
      setRecommandationSeeds(seeds);

      console.log('here', { tracks, seeds });
    })();
  }, [filteredList]);

  return (
    <>
      <FilteringContext.Provider value={filterContextValue}>
        <PlaylistHeader
          title="Liked Songs"
          imageUrl="/images/spotify-liked-image.png"
        />
        <br />
        <GenreList />
        <br />
        <FilterList />
        <br />
        <PlaylistActions />
        <br />
        <PlaylistListTable />
      </FilteringContext.Provider>
    </>
  );
};

export default Playlist;
