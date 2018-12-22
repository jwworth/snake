import React from 'react';

import _chunk from 'lodash/chunk';
import _range from 'lodash/range';

const ROW_LENGTH = 50;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

type StateProps = {
  world: number[];
  snake: number[];
  direction: string;
};

class Snake extends React.Component<{}, StateProps> {
  state = {
    world: _range(ROW_LENGTH * ROW_LENGTH),
    snake: [123 - 50, 123, 124, 125],
    direction: 'e',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { direction } = this.state;
    switch (event.keyCode) {
      case UP:
        direction !== 's' && this.setState({ direction: 'n' });
        break;
      case DOWN:
        direction !== 'n' && this.setState({ direction: 's' });
        break;
      case RIGHT:
        direction !== 'w' && this.setState({ direction: 'e' });
        break;
      case LEFT:
        direction !== 'e' && this.setState({ direction: 'w' });
        break;
      default:
        break;
    }
  };

  advance = () => {
    const { direction, snake } = this.state;
    const newSnake = snake;
    newSnake.shift();

    const directionCalculator: {
      readonly [index: string]: number;
      n: number;
      e: number;
      s: number;
      w: number;
    } = { n: -ROW_LENGTH, s: ROW_LENGTH, e: 1, w: -1 };

    const nextPosition =
      snake[snake.length - 1] + directionCalculator[direction];
    newSnake.push(nextPosition);

    this.setState({ snake: newSnake });
  };

  changeDirection = (direction: string) => {
    this.setState({ direction });
  };

  render() {
    const { direction, world, snake } = this.state;
    return (
      <React.Fragment>
        <table>
          {_chunk(world, ROW_LENGTH).map((row, index) => (
            <TableRow key={index} row={row} snake={snake} />
          ))}
        </table>
        <p>Length: {snake.length}</p>
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
