import { MouseEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import { faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VolumeBarStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;
  .volume-range {
    width: 100%;
    border-radius: 4px;
    background-color: #e5e5e5;
    height: 4px;
    cursor: pointer;

    .active-volume {
      width: 0%;
      height: 100%;
      background-color: black;
      border-radius: 4px;
    }
  }
`;

const Volume = ({ player }: { player: Spotify.Player }) => {
  // setPlaybackVolume

  useEffect(() => {
    player.getVolume().then((volume) => {
      const volumeBar = document.querySelector(
        '.active-volume',
      ) as HTMLDivElement;
      volumeBar.style.width = `${volume * 100}%`;
    });
  }, [player]);

  const setVolume = (e: MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const volumeBarWidth = volumeBar.offsetWidth;
    const volumeBarLeft = volumeBar.getBoundingClientRect().left;
    const volumeBarClickPosition = e.pageX;
    const volumeBarClickPositionRelativeToBar =
      volumeBarClickPosition - volumeBarLeft;
    const volumeBarClickPositionRelativeToBarPercent = Math.round(
      (volumeBarClickPositionRelativeToBar / volumeBarWidth) * 100,
    );

    const volumeBarActive = volumeBar.querySelector(
      '.active-volume',
    ) as HTMLDivElement;

    volumeBarActive.style.width = `${volumeBarClickPositionRelativeToBarPercent}%`;
    player.setVolume(volumeBarClickPositionRelativeToBarPercent / 100);
  };

  return (
    <div className="flex gap-2">
      <FontAwesomeIcon icon={faVolumeLow} />
      <VolumeBarStyles>
        <div className="volume-range" onClick={(e) => setVolume(e)}>
          <div className="active-volume"></div>
        </div>
      </VolumeBarStyles>
    </div>
  );
};

export default Volume;
