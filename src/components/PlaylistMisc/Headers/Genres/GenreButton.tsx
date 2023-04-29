export const GenreButton = ({
  genre,
  count,
  index,
  color,
}: {
  genre: string;
  count: number;
  index: number;
  color?: string;
}) => {
  return (
    <div
      key={`${index}-orevall-${genre}`}
      className="
              font-apfel 
              text-white
              px-2 
              py-1
              bg-blue-100
              rounded-md
              flex
              gap-x-1
              items-center
              w-max
              cursor-pointer
            "
      style={
        color
          ? { backgroundColor: color }
          : {
              background: `rgb(
                ${Math.random() * 255}, 
                ${Math.random() * 255},
                ${Math.random() * 255})`,
            }
      }
    >
      <span>{genre}</span>
      <span>{count}</span>
    </div>
  );
};

export default GenreButton;
