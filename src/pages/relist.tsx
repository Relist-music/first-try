import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';

const Relist = () => {
  const [liked] = useAllLiked();

  return (
    <>
      <h1>You are currently connected to relist</h1>
      <h2>you should be happy 😀</h2>
      {!liked.length ? <h1>Loading...</h1> : <h1>Success</h1>}
      {liked.length && <Playlist list={liked} />}
    </>
  );
};

export default Relist;
