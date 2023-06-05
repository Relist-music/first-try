import { pickRecommandations } from '@/services/filtering/recommandations';
import fetchRecommandations from '@/services/spotify/fetchRecommandations';
import { RelistTrack } from '@/types/myTypes';
import { RecommendationsSeedObject } from '@/types/spotify-node-api';
import { mapRecommendationTrackObjectToGenreAggregate } from '@/utils/mapRecommendationTrackObjectToGenreAggregate';
import { useEffect, useState } from 'react';

const UseRecommandations = ({ list }: { list: RelistTrack[] }) => {
  const [recommandationList, setRecommandationList] = useState<RelistTrack[]>(
    [],
  );
  const [recommandationSeeds, setRecommandationSeeds] = useState<
    RecommendationsSeedObject[]
  >([]);

  const selected = pickRecommandations({ list });

  useEffect(() => {
    if (selected.length) {
      (async () => {
        const { tracks, seeds } = await fetchRecommandations({
          seed_tracks: selected.map((aggregate) => aggregate.trackId).join(','),
          seed_genres: '',
          seed_artists: '',
        });

        const recommandationListRelist = tracks.map((track, index) =>
          mapRecommendationTrackObjectToGenreAggregate(track, index),
        );

        // setRecommandationList(recommandationListRelist);
        // setRecommandationSeeds(seeds);
      })();
    }
  }, [list, selected]);

  return { recommandationSeeds };
};

export default UseRecommandations;
