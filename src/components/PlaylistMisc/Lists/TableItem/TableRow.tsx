// import Image from 'next/image';
import prettyMilliseconds from 'pretty-ms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { GenreAggregateV1, usefullArtist } from '@/types/myTypes';
import { TableCheckboxCell, TableGenreCell } from './TableCell';

const TableRow = ({ richGenreTrack }: { richGenreTrack: GenreAggregateV1 }) => {
  return (
    <tr key={richGenreTrack.trackId}>
      <TableCheckboxCell />
      <td>
        <div className="flex gap-x-2 pb-2">
          <img src={richGenreTrack.album.images[1].url} alt="" />
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
          <TableGenreCell richGenreTrack={richGenreTrack} />
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
      <td>
        <div>
          <FontAwesomeIcon className="text-green-600" icon={faSolidHeart} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
