// import Image from 'next/image';

const PlaylistHeader = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <div id="header" className="flex items-end gap-x-2">
    <img src={imageUrl} alt="likes images" />
    <h1 className="text-2xl">{title}</h1>
  </div>
);

export default PlaylistHeader;
