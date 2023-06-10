import { useHover } from '@/hooks/useHover';

const TableCellCheckbox = ({
  selected,
  setSelected,
}: {
  selected: boolean;
  setSelected: () => void;
}) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const styleValue = selected
    ? { opacity: '1' }
    : isHovered
    ? { opacity: '1' }
    : { opacity: '0.1' };
  return (
    <td ref={hoverRef} onClick={() => setSelected()}>
      <label htmlFor="select1">
        <input
          id="select1"
          type="checkbox"
          checked={selected}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          style={styleValue}
        />
      </label>
    </td>
  );
};

export default TableCellCheckbox;
