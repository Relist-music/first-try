import { RelistTrack } from '@/types/myTypes';
import { useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { TableRow } from '@/components/PlaylistMisc/Lists/TableItem';

export const Recommandations = ({
  recommandationsItems,
}: {
  recommandationsItems: RelistTrack[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [exposedRecommandation, othersRecommandations] = [
    recommandationsItems[0],
    recommandationsItems.slice(1),
  ];

  if (!exposedRecommandation) return null;

  return (
    <div
      className={cn(
        'fixed bg-white bottom-0 border border-red-400 h-auto w-screen flex flex-col ease-in-out duration-300',
        { 'max-h-64': isOpen },
      )}
    >
      <div id="full top row" className="flex-shrink-0">
        <div
          id="clickage part"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>Recommandations</span>
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            color={'#545454'}
          />
        </div>
      </div>
      <div className="flex flex-col overflow-y-scroll">
        <table>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Genres</th>
            <th>Time</th>
          </tr>
          <tbody>
            <TableRow
              key={exposedRecommandation.trackId}
              richGenreTrack={exposedRecommandation}
              isRecommandation={true}
            />
            {isOpen &&
              othersRecommandations.map((otherReco) => (
                <TableRow
                  key={otherReco.trackId}
                  richGenreTrack={otherReco}
                  isRecommandation={true}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recommandations;
