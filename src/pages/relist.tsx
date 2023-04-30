import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';
import savedGenresAggregate from '@/public/jsons/savedGenresAggregate.json';

const Relist = () => {
  const { liked, isLoading } = useAllLiked();

  if (savedGenresAggregate) {
    return <Playlist list={savedGenresAggregate} />;
  }

  return (
    <>
      <h1>You are currently connected to relist</h1>
      <h2>you should be happy 😀</h2>
      {isLoading ? <h1>Loading...</h1> : <h1>Success</h1>}
      {!isLoading && liked && <Playlist list={liked} />}
    </>
  );
};

export default Relist;
