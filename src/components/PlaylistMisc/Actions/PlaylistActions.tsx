import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const PlaylistActions = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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
