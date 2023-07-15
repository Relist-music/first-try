import {
  MagnifyingGlassIcon,
  HomeIcon,
  Bars3Icon,
  ChevronRightIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { HistoryIcon } from '../icons/HistoryIcon';
import styled from '@emotion/styled';

const LinksStyles = styled.div`
  background-color: #1b2326;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  color: white;
  flex: 1;
  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    svg {
      width: 16px;
      height: 16px;
    }
    .top {
      display: flex;
      flex-direction: column;
      gap: 4px;
      > div {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
    .playlists {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .playlists__header {
        display: flex;
        gap: 4px;
        align-items: center;
      }
      .playlist__items {
        margin-inline-start: 16px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: max-content;
      }
    }
  }
`;

export const Links = () => {
  return (
    <LinksStyles>
      <div className="container">
        <div className="top">
          <div>
            <MagnifyingGlassIcon />
            <h6>Search</h6>
          </div>
          <div>
            <HomeIcon />
            <h6>Home</h6>
          </div>
          <div>
            <HistoryIcon />
            <h6>Playing Queue</h6>
          </div>
          <div>
            <Bars3Icon />
            <h6>Genres</h6>
          </div>
        </div>
        <div className="playlists">
          <div className="playlists__header">
            <ChevronRightIcon />
            <h6>Playlists</h6>
            <PlusCircleIcon />
          </div>
          <div className="playlist__items">
            <span>Songs to Sing in the Car</span>
            <span>{"Today's Top Hits ♫"}</span>
            <span>Relax and Unwind: Calming Mel...</span>
            <span>Indie Discovery</span>
            <span>Chill Vibes</span>
          </div>
        </div>
      </div>
    </LinksStyles>
  );
};
