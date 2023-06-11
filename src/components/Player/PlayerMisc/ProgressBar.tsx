import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { seekToPosition } from '@/services/spotify/seekToPosition';
import { PlayingContext } from '@/contexts/PlayingContext';
import prettyMilliseconds from 'pretty-ms';

const ProgressBarStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .progress-bar {
    width: 100%;
    border-radius: 4px;
    background-color: #e5e5e5;
    height: 4px;
    cursor: pointer;

    .active-progress-bar {
      width: 0%;
      height: 100%;
      background-color: black;
      border-radius: 4px;
    }
  }
`;

const ProgressBar = ({
  currentPosition,
  fullDuration,
  isPlaying,
  player,
  usePlayer = false,
}: {
  currentPosition: number;
  fullDuration: number;
  isPlaying: boolean;
  player: Spotify.Player | null;
  usePlayer?: boolean;
}) => {
  const { deviceId } = useContext(PlayingContext);
  const [progressTime, setProgressTime] = useState(currentPosition);
  const refTimestamp = useRef(Date.now()); // ref for start timestamp
  const timeoutId = useRef<NodeJS.Timeout | null>(null); // ref for timeout id

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Start the timer
    const tick = () => {
      if (isPlaying) {
        const elapsed = Date.now() - refTimestamp.current;

        // Calculate new progress time
        const newProgressTime = currentPosition + elapsed;
        // Ensure progress time doesn't exceed full duration
        if (newProgressTime <= fullDuration) {
          setProgressTime(newProgressTime);
          timeoutId.current = setTimeout(tick, 1000); // Schedule the next tick
        }
      } else {
        // Reset the start timestamp and progress time when paused
        refTimestamp.current = Date.now();
        setProgressTime(currentPosition);
      }
    };

    tick(); // Start the timer loop

    // Cleanup function
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [currentPosition, fullDuration, isPlaying, progressTime]);

  const setProgress = (e: MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const progressBarWidth = progressBar.offsetWidth;
    const progressBarLeft = progressBar.getBoundingClientRect().left;
    const progressBarClickPosition = e.pageX - progressBarLeft;
    const clickPositionPercentage = progressBarClickPosition / progressBarWidth;

    const progressBarActive = progressBar.querySelector(
      '.active-progress-bar',
    ) as HTMLDivElement;

    progressBarActive.style.width = `${clickPositionPercentage * 100}%`;
    if (player && usePlayer) {
      player.seek(clickPositionPercentage * fullDuration);
    }
    seekToPosition({
      deviceId: deviceId ?? '',
      position: Math.round(clickPositionPercentage * fullDuration),
    });
  };

  useEffect(() => {
    const progressPercentage = (progressTime / fullDuration) * 100;
    const progressBarActive = document.querySelector(
      '.active-progress-bar',
    ) as HTMLDivElement;
    if (progressBarActive) {
      progressBarActive.style.width = `${progressPercentage}%`;
    }
  }, [progressTime, fullDuration]);

  return (
    <div className="time flex gap-2 text-xs">
      <span className="current-time">
        {prettyMilliseconds(progressTime, {
          secondsDecimalDigits: 0,
        }).replaceAll(' ', '')}
      </span>
      <ProgressBarStyles>
        <div className="progress-bar" onClick={setProgress}>
          <div className="active-progress-bar"></div>
        </div>
      </ProgressBarStyles>
      <span className="current-time">
        {prettyMilliseconds(fullDuration, {
          secondsDecimalDigits: 0,
        }).replaceAll(' ', '')}
      </span>
    </div>
  );
};

export default ProgressBar;
