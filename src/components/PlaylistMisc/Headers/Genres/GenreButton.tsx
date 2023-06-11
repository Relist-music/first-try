import { FilteringContext } from '@/contexts/FilteringContext';
import { mapUmbrellaToSubgenres } from '@/utils/grouping';
import { useContext } from 'react';
import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';

export const GenreButton = ({
  genre,
  count,
  index,
  color,
  is,
}: {
  genre: string;
  count: number;
  index: number;
  color?: string;
  is: 'umbrella' | 'subgenre';
}) => {
  const { setUmbrellaGenres, setFilters } = useContext(FilteringContext);
  return (
    <div
      onClick={() => {
        console.log('is', is);
        if (is === 'umbrella') {
          console.log('genre', genre);
          const newFilters = mapUmbrellaToSubgenres({
            umbrella: genre,
            genresGrouping: UMBRELLA_WITH_SUBGENRES,
          });
          if (newFilters) {
            setFilters((prev) => [...prev, ...newFilters]);
          }
          setUmbrellaGenres((prev) => [...prev, genre]);
        } else {
          setFilters((prev) => [...prev, genre]);
        }
      }}
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
