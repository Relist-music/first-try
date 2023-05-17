const ShowMoreButton = ({
  hasLofOfItem,
  showAll,
  setShowAll,
  itemName,
}: {
  /**
   * hasLofOfItem
   */
  hasLofOfItem: boolean;

  /**
   * showAll
   */
  showAll: boolean;

  /**
   * setShowAll
   */
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * itemName
   */
  itemName?: string;
}) => {
  return (
    <>
      {hasLofOfItem && (
        <div
          className="my-1 border-2 border-black w-max rounded-md px-2 py-1 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          <span className="font-apfel text-red-500 ">
            {showAll
              ? itemName
                ? `Hide all ${itemName}`
                : 'Hide all'
              : itemName
              ? `Show all ${itemName}`
              : 'Show all'}
          </span>
        </div>
      )}
    </>
  );
};

export default ShowMoreButton;
