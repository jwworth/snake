import React from 'react';

import _chunk from 'lodash/chunk';

const ROW_LENGTH = 50;

type StateProps = {
  world: number[];
};

class Snake extends React.Component<{}, StateProps> {
  state = {
    world: [...new Array(ROW_LENGTH * ROW_LENGTH)].map(value => 0),
  };

  render() {
    return (
      <table>
        {_chunk(this.state.world, ROW_LENGTH).map((row, index) => (
          <TableRow key={index} row={row} />
        ))}
      </table>
    );
  }
}

const TableRow = ({ row }: { row: number[] }) => {
  return (
    <tr>
      {row.map((cellValue, index) => {
        return <Cell key={index} value={cellValue} />;
      })}
    </tr>
  );
};

const Cell = ({ value }: { value: number }) => {
  const color = (value: number) => (value === 1 ? '#000' : '#fff');
  return (
    <td
      style={{ width: '0.5rem', height: '0.5rem', background: color(value) }}
    />
  );
};

export default Snake;
