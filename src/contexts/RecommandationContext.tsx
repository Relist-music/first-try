/* eslint-disable @typescript-eslint/no-empty-function */
// const [recommandationList, setRecommandationList] = useState<RelistTrack[]>(
//   [],
// );
// const [recommandationSeeds, setRecommandationSeeds] = useState<
//   RecommendationsSeedObject[]
// >([]);

// const selected = pickRecommandations({ list });
// useEffect(() => {
//   if (selected.length) {
//     (async () => {
//       const { tracks, seeds } = await fetchRecommandations({
//         seed_tracks: selected.map((aggregate) => aggregate.trackId).join(','),
//         seed_genres: '',
//         seed_artists: '',
//       });

//       const recommandationListRelist = tracks.map((track, index) =>
//         mapRecommendationTrackObjectToGenreAggregate(track, index),
//       );

//       setRecommandationList(recommandationListRelist);
//       setRecommandationSeeds(seeds);
//     })();
//   }
// }, [list, selected]);

import UseRecommandations from '@/hooks/recommandations';
import { pickRecommandations } from '@/services/filtering/recommandations';
import fetchRecommandations from '@/services/spotify/fetchRecommandations';
import { RelistTrack } from '@/types/myTypes';
import { RecommendationsSeedObject } from '@/types/spotify-node-api';
import { mapRecommendationTrackObjectToGenreAggregate } from '@/utils/mapRecommendationTrackObjectToGenreAggregate';
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

        const recommandationListRelist = tracks.map((track, index) =>
          mapRecommendationTrackObjectToGenreAggregate(track, index),
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
