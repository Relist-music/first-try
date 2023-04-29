import { useState } from 'react';
import { useHover } from '@/hooks/useHover';

const TableCellCheckbox = () => {
  const [selected, setSelected] = useState(false);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const styleValue = selected
    ? { opacity: '1' }
    : isHovered
    ? { opacity: '1' }
    : { opacity: '0.1' };
  return (
    <td ref={hoverRef} onClick={() => setSelected(!selected)}>
      <label htmlFor="select1">
        <input
          id="select1"
          type="checkbox"
          checked={selected}
          style={styleValue}
        />
      </label>
    </td>
  );
};

export default TableCellCheckbox;
