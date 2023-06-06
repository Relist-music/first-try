import { RecommandationsContext } from '@/contexts/RecommandationContext';
import { useContext } from 'react';
import { TableRow } from '../PlaylistMisc/Lists/TableItem';
import { FilteringContext } from '@/contexts/FilteringContext';
import { pickRecommandations } from '@/services/filtering/recommandations';
import { mapRecommendationTrackObjectToGenreAggregate } from '@/utils/mapRecommendationTrackObjectToGenreAggregate';
import fetchRecommandations from '@/services/spotify/fetchRecommandations';

const RecommandationList = () => {
  const { filteredList } = useContext(FilteringContext);
  const {
    recommandationList,
    setRecommandationSeeds,
    setSelected,
    setRecommandationList,
  } = useContext(RecommandationsContext);
  const selectedPick = pickRecommandations({ list: filteredList });

  async function resetRecommandations() {
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
        setSelected({
          tracks: selectedPick.map((aggregate) => aggregate.trackId),
          artists: [],
          genres: [],
        });
        setRecommandationList(recommandationListRelist);
        setRecommandationSeeds(seeds);
      })();
    }
  }

  return (
    <>
      <button
        className="p-2 bg-blue-400"
        onClick={() => resetRecommandations()}
      >
        reset recommandations
      </button>
      <table className="table-auto">
        {recommandationList.length > 0 && (
          <>
            <thead>
              <tr>
                <td>Recommandations</td>
              </tr>
            </thead>
            <tbody>
              {recommandationList.map((track) => {
                return (
                  <TableRow
                    key={track.trackId}
                    richGenreTrack={track}
                    isRecommandation={true}
                  />
                );
              })}
            </tbody>
          </>
        )}
      </table>
    </>
  );
};

export default RecommandationList;
