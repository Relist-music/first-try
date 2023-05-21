import { RelistTrack } from '@/types/myTypes';
import { useContext } from 'react';
import { FilteringContext } from '@/contexts/filteringContext';

const useFindlikedContextForTrack = ({ track }: { track: RelistTrack }) => {
  const { filteredList } = useContext(FilteringContext);
  const { indexInList } = track;
  const isInFilteredList = filteredList.find(
    (x) => x.indexInList === indexInList,
  );
  if (isInFilteredList) {
    return {
      uris: [...filteredList.slice(indexInList).map((track) => track.trackUri)],
      wasFound: true,
    };
  } else {
    return {
      uris: [track.trackUri],
      wasFound: false,
    };
  }
};

const useFindRecommandationContextForTrack = ({
  track,
}: {
  track: RelistTrack;
}) => {
  const { recommandationList } = useContext(FilteringContext);
  const { indexInList } = track;
  const isInFilteredList = recommandationList.find(
    (x) => x.indexInList === indexInList,
  );
  if (isInFilteredList) {
    return {
      uris: [
        ...recommandationList.slice(indexInList).map((track) => track.trackUri),
      ],
      wasFound: true,
    };
  } else {
    return {
      uris: [track.trackUri],
      wasFound: false,
    };
  }
};

export const useFindContextForTrack = ({ track }: { track: RelistTrack }) => {
  const { list } = track;
  const { uris: likedContextUris, wasFound: wasFoundInLiked } =
    useFindlikedContextForTrack({ track });
  const {
    uris: RecommandationContextUris,
    wasFound: wasFoundInRecommandation,
  } = useFindRecommandationContextForTrack({ track });
  if (list === 'liked' && wasFoundInLiked) {
    return {
      uris: likedContextUris,
    };
  } else if (list === 'recommandation' && wasFoundInRecommandation) {
    return {
      uris: RecommandationContextUris,
    };
  } else {
    console.log('error: list is not liked or recommandation');
    return {
      uris: [track.trackUri],
    };
  }
};
