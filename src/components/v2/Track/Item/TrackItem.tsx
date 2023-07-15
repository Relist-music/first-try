import styled from '@emotion/styled';
import TrackItemAuthor from './TrackItemAuthor';

const TrackItemStyle = styled.div`
  display: flex;
`;

export const TrackItem = () => {
  console.log('ok');
  return (
    <TrackItemStyle>
      <input type="checkbox" />
      <div className="track-infos">
        <div className="track-image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            alt=""
          />
          <div className="track-text-infos">
            <span className="title">
              Flute Concerto in D Major: III. Allegro
            </span>
            <div className="authors">
              <TrackItemAuthor
                authors={['Giuseppe Tartini', 'Raffaele Trevisani']}
              />
            </div>
            <span className="album"></span>
          </div>
        </div>
      </div>
    </TrackItemStyle>
  );
};
