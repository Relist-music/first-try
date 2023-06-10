import { FilteringContext } from '@/contexts/FilteringContext';
import styled from '@emotion/styled';
import { useContext } from 'react';

const ActionBarContainer = styled.div`
  position: sticky;
  bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 1;
  background-color: white;
  border: 1px solid gray;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const ActionBar = () => {
  const { seletedTracksIds } = useContext(FilteringContext);
  if (seletedTracksIds.length === 0) return null;
  return (
    <ActionBarContainer className="here">
      {JSON.stringify(seletedTracksIds)}
      <button className="cursor-pointer hover:text-yellow-600 mr-1">
        send to recommandation
      </button>
      <button className="cursor-pointer hover:text-yellow-600 mr-1">
        go to radio
      </button>
      <button className="cursor-pointer hover:text-yellow-600">
        create playlist
      </button>
    </ActionBarContainer>
  );
};

export default ActionBar;
