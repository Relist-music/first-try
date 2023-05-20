import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { PlayingContext } from '@/contexts/PlayingContext';

const PlaylistActions = () => {
  const { isPlaying, setIsPlaying, setCurrentAudio, setCurrentPlaylist } =
    useContext(PlayingContext);
  return (
    <div
      className="text-6xl text-green-400 w-max"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? (
        <FontAwesomeIcon icon={faCirclePause} />
      ) : (
        <FontAwesomeIcon icon={faCirclePlay} />
      )}
    </div>
  );
};

export default PlaylistActions;
