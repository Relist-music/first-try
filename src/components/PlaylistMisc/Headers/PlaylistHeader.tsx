// import Image from 'next/image';

const PlaylistHeader = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <div id="header" className="flex items-end gap-x-2">
    <img src={imageUrl} alt="" />
    <h1 style={{ lineHeight: '120%' }}>{title}</h1>
  </div>
);

export default PlaylistHeader;
