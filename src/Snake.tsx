import React from 'react';

import _chunk from 'lodash/chunk';
import _range from 'lodash/range';

const ROW_LENGTH = 50;

type StateProps = {
  world: number[];
  snake: number[];
};

class Snake extends React.Component<{}, StateProps> {
  state = {
    world: _range(ROW_LENGTH * ROW_LENGTH),
    snake: [123 - 50, 123, 124, 125],
  };

  advance = () => {
    const { snake } = this.state;
    const newSnake = snake;
    newSnake.shift();

    const nextPosition = snake[snake.length - 1] + 1;
    newSnake.push(nextPosition);

    this.setState({ snake: newSnake });
  };

  render() {
    const { world, snake } = this.state;
    return (
      <React.Fragment>
        <table>
          {_chunk(world, ROW_LENGTH).map((row, index) => (
            <TableRow key={index} row={row} snake={snake} />
          ))}
        </table>
        <button onClick={this.advance}>Advance</button>
      </React.Fragment>
    );
  }
}

const TableRow = ({ row, snake }: { row: number[]; snake: number[] }) => {
  return (
    <tr>
      {row.map(cellIndex => {
        return <Cell key={cellIndex} position={cellIndex} snake={snake} />;
      })}
    </tr>
  );
};

const Cell = ({ position, snake }: { position: number; snake: number[] }) => {
  const color = (position: number) =>
    snake.indexOf(position) !== -1 ? '#000' : '#fff';
  return (
    <td
      style={{ width: '0.5rem', height: '0.5rem', background: color(position) }}
    />
  );
};

export default Snake;
