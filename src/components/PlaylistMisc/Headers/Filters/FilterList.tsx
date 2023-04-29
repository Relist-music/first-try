import { FilterContext } from '@/components/Playlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { faCircleXmark as faCircleXmarkOutline } from '@fortawesome/free-regular-svg-icons';

const FilterList = () => {
  const { filters, setFilters } = useContext(FilterContext);
  return (
    <div>
      {filters.length === 0 ? (
        <span>No filters</span>
      ) : (
        <div className="flex items-center ">
          <span className="mr-1">Active filters are</span>
          {filters.map((filter, index) => (
            <div
              key={`${index}-active-filter-${filter}`}
              className="
          font-apfel 
          text-blue-500 
          mr-1 
          px-2 
          py-1
          bg-blue-100
          rounded-md
          flex
          gap-x-1
          items-center
          w-max
          "
            >
              {filter}
              <FontAwesomeIcon
                icon={faCircleXmarkOutline}
                className="cursor-pointer"
                onClick={() => {
                  setFilters(
                    filters.filter((activeFilter) => activeFilter !== filter),
                  );
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterList;
