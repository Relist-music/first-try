import styled from '@emotion/styled';
const TrackItemAuthorStyles = styled.div``;

const TrackItemAuthor = ({ authors }: { authors: string[] }) => (
  <TrackItemAuthorStyles>
    {authors.map((author, index) => {
      if (index === 0) return <span key={index}>{author}</span>;
      return <span key={index}> • {author}</span>;
    })}
  </TrackItemAuthorStyles>
);
export default TrackItemAuthor;
