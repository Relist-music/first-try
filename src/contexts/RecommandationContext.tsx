/* eslint-disable @typescript-eslint/no-empty-function */

import { pickRecommandations } from '@/services/filtering/recommandations';
import fetchRecommandations from '@/services/spotify/fetchRecommandations';
import { RelistTrack } from '@/types/myTypes';
import { RecommendationsSeedObject } from '@/types/spotify-node-api';
import { asyncMapRecommendationTrackObjectToGenreAggregate } from '@/utils/mapRecommendationTrackObjectToGenreAggregate';
import { createContext, useEffect, useState } from 'react';

interface selectedProps {
  tracks: string[];
  artists: string[];
  genres: string[];
}
export type RecommandationsContextType = {
  selected: selectedProps;
  setSelected: React.Dispatch<React.SetStateAction<selectedProps>>;

  recommandationList: RelistTrack[];
  setRecommandationList: React.Dispatch<React.SetStateAction<RelistTrack[]>>;

  recommandationSeeds: RecommendationsSeedObject[];
  setRecommandationSeeds: React.Dispatch<
    React.SetStateAction<RecommendationsSeedObject[]>
  >;
};

export const RecommandationsContext = createContext<RecommandationsContextType>(
  {
    selected: {
      tracks: [],
      artists: [],
      genres: [],
    },
    setSelected: () => {},

    recommandationList: [],
    setRecommandationList: () => {},

    recommandationSeeds: [],
    setRecommandationSeeds: () => {},
  },
);

export const RecommandationsContextProvider = ({
  children,
  list = [],
}: {
  children: React.ReactNode;
  list: RelistTrack[];
}) => {
  const [selectedCopy, setSelectedCopy] = useState<selectedProps>({
    tracks: [],
    artists: [],
    genres: [],
  });
  const [recommandationList, setRecommandationList] = useState<RelistTrack[]>(
    [],
  );
  const [recommandationSeeds, setRecommandationSeeds] = useState<
    RecommendationsSeedObject[]
  >([]);

  useEffect(() => {
    const selectedPick = pickRecommandations({ list });

    if (selectedPick.length) {
      (async () => {
        const { tracks, seeds } = await fetchRecommandations({
          seed_tracks: selectedPick
            .map((aggregate) => aggregate.trackId)
            .join(','),
          seed_genres: '',
          seed_artists: '',
        });

        const recommandationListRelist = await Promise.all(
          tracks.map(
            async (track, index) =>
              await asyncMapRecommendationTrackObjectToGenreAggregate(
                track,
                index,
              ),
          ),
        );

        setSelectedCopy({
          tracks: selectedPick.map((aggregate) => aggregate.trackId),
          artists: [],
          genres: [],
        });
        setRecommandationList(recommandationListRelist);
        setRecommandationSeeds(seeds);
      })();
    }
  }, [list]);

  const RecommandationsContextValue = {
    selected: selectedCopy,
    setSelected: setSelectedCopy,
    recommandationList,
    setRecommandationList,
    recommandationSeeds,
    setRecommandationSeeds,
  };

  return (
    <RecommandationsContext.Provider value={RecommandationsContextValue}>
      {children}
    </RecommandationsContext.Provider>
  );
};

export default RecommandationsContextProvider;
