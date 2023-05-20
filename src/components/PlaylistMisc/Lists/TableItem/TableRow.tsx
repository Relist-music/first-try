// import Image from 'next/image';
import prettyMilliseconds from 'pretty-ms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { RelistTrack, usefullArtist } from '@/types/myTypes';
import { TableCheckboxCell, TableGenreCell } from './TableCell';
import { useContext, useState } from 'react';
import { playOrResumeTrack } from '@/services/spotify/PlayResumePlayback';
import { PlayingContext } from '@/contexts/PlayingContext';
import { useFindContextForTrack } from '@/hooks/trackContext/findContextForTrack';

const TableRow = ({
  richGenreTrack,
  isRecommandation = false,
}: {
  richGenreTrack: RelistTrack;
  isRecommandation?: boolean;
}) => {
  const [selected, setSelected] = useState(false);
  const { deviceId } = useContext(PlayingContext);
  const { uris: foundUris } = useFindContextForTrack({ track: richGenreTrack });
  return (
    <tr
      key={richGenreTrack.trackId}
      className={
        selected
          ? 'bg-gray-200 cursor-pointer'
          : 'hover:bg-gray-100 cursor-pointer'
      }
    >
      <TableCheckboxCell selected={selected} setSelected={setSelected} />
      <td
        onClick={async () => {
          console.log('clicked', richGenreTrack.trackUri);
          playOrResumeTrack({
            uris: foundUris,
            device_id: deviceId ?? '',
          });
        }}
      >
        <div className="flex gap-x-2 pb-2">
          <img
            style={{ width: '100px', height: '100px' }}
            src={richGenreTrack.album.images[1].url}
            alt=""
          />
          <div>
            <h6 className="font-semibold text-xl">
              {richGenreTrack.trackName}
            </h6>
            <div id="artists" className="flex gap-x-1">
              {richGenreTrack.trackArtists.map((artist: usefullArtist) => (
                <span key={artist.id} className="text-sm">
                  {artist.name}
                </span>
              ))}
            </div>
            <span className="text-xs">{richGenreTrack.album.name}</span>
          </div>
        </div>
      </td>
      <td className="max-w-[60rem]">
        <div id="genres" className="flex flex-wrap gap-x-1">
          {!isRecommandation ? (
            <TableGenreCell richGenreTrack={richGenreTrack} />
          ) : (
            <span>no genres yet for recommandation</span>
          )}
        </div>
      </td>
      <td>
        <span>
          {prettyMilliseconds(richGenreTrack.duration_ms, {
            secondsDecimalDigits: 0,
            keepDecimalsOnWholeSeconds: true,
          })}
        </span>
      </td>
      <td className="pr-2">
        <div>
          <FontAwesomeIcon className="text-green-600" icon={faSolidHeart} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
