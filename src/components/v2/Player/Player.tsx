import styled from '@emotion/styled';
import {
  HeartIcon,
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { GenresTag } from '../GenresTag';

const PlayerV2Styles = styled.div`
  margin: 10px;
  width: 240px;
  background-color: #1b2326;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  // here create nested group and update this value
  gap: 10px;
  .image {
    width: 100%;
    height: 150px;
    min-height: 150px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    svg {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      path {
        fill: #fff;
        /* stroke: black;
        stroke-width: 1px; */
      }
    }
  }

  .progress-bar {
    width: 100%;
    border-radius: 4px;
    height: 4px;
    min-height: 4px;
    cursor: pointer;
    background: #827f7f;

    .active-progress-bar {
      width: 10%;
      height: 100%;
      background-color: white;
      border-radius: 4px;
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 8px;
    &-main {
      display: flex;
      gap: 4px;
    }
    svg {
      width: 20px;
      height: 20px;
      path {
        fill: #fff;
      }
    }
  }

  .track-infos {
    display: flex;
    align-items: center;
    svg {
      min-width: 12px;
      min-height: 12px;
      width: 12px;
      height: 12px;
      path {
        fill: #fff;
      }
    }
    &__text {
      display: flex;
      color: white;
      gap: 4px;
      span {
        width: max-content;
      }
    }
  }

  .leftovers {
    display: flex;
    color: white;
    align-items: center;
    gap: 8px;
    svg {
      min-height: 20px;
      min-width: 20px;
      width: 20px;
      height: 20px;
    }
    .volume {
      flex: 1;
      display: grid;
      align-items: center;
      gap: 4px;
      grid-template-columns: 20px 1fr;
      &-bar {
        width: 100%;
        min-width: 30px;
        border-radius: 4px;
        height: 4px;
        min-height: 4px;
        cursor: pointer;
        background: #827f7f;
        &--active {
          width: 10%;
          height: 100%;
          background-color: white;
          border-radius: 4px;
        }
      }
    }
  }
`;

export const PlayerV2 = () => {
  return (
    <PlayerV2Styles>
      <div className="image">
        <img
          src="https://m.media-amazon.com/images/I/A1AT1xuPEDL._UF894,1000_QL80_.jpg"
          alt="cover mauvais ordre"
        />
        <HeartIcon />
      </div>
      <div className="progress-bar">
        <div className="active-progress-bar"></div>
      </div>
      <div className="controls">
        <FontAwesomeIcon icon={faShuffle} />
        <div className="controls-main">
          <BackwardIcon />
          <PlayCircleIcon />
          <ForwardIcon />
        </div>
        <FontAwesomeIcon icon={faRepeat} />
      </div>
      <div className="track-infos">
        <ChevronRightIcon />
        <div className="track-infos__text">
          <span className="track-infos__text__title">Decrescendo</span>
          <span className="track-infos__text__artist">Lomepal</span>
          <span className="track-infos__text__album">Mauvais ordre</span>
        </div>
      </div>
      <div className="leftovers">
        <GenresTag label="rap" />
        <div className="volume">
          <SpeakerWaveIcon />
          <div className="volume-bar">
            <div className="volume-bar--active"></div>
          </div>
        </div>
      </div>
    </PlayerV2Styles>
  );
};
