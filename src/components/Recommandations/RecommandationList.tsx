import { RecommandationsContext } from '@/contexts/RecommandationContext';
import { useContext } from 'react';
import { TableRow } from '../PlaylistMisc/Lists/TableItem';

const RecommandationList = () => {
  const { recommandationList } = useContext(RecommandationsContext);

  return (
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
  );
};

export default RecommandationList;
