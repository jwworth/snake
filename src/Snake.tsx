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
  food: number;
  timer: NodeJS.Timeout | undefined;
};

class Snake extends React.Component<{}, StateProps> {
  state = {
    world: _range(ROW_LENGTH * ROW_LENGTH),
    snake: [122, 123, 124, 125],
    direction: 'e',
    food: 127,
    timer: undefined,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  start = () => {
    const timer = setInterval(this.advance, 500);
    this.setState({ timer });
  };

  stop = () => {
    clearInterval(this.state.timer);
    this.setState({ timer: undefined });
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const { direction, timer } = this.state;
    if (!timer) {
      this.start();
    }
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

  distributeFood = () => {
    const potentialLocations = this.state.world.slice();
    potentialLocations.splice(this.state.food, 1);
    this.state.snake.map(snakePart => {
      potentialLocations.splice(snakePart, 1);
    });

    const newFoodLocation =
      potentialLocations[Math.floor(Math.random() * potentialLocations.length)];

    this.setState({ food: newFoodLocation });
  };

  advance = () => {
    const { direction, snake, food } = this.state;
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

    if (newSnake.indexOf(nextPosition) !== -1) {
      this.stop();
    }

    newSnake.push(nextPosition);

    if (nextPosition === food) {
      const extraPosition =
        newSnake[newSnake.length - 1] + directionCalculator[direction];
      newSnake.push(extraPosition);

      this.distributeFood();
    }

    this.setState({ snake: newSnake });
  };

  changeDirection = (direction: string) => {
    this.setState({ direction });
  };

  render() {
    const { food, direction, world, snake } = this.state;
    return (
      <React.Fragment>
        <table>
          <tbody>
            {_chunk(world, ROW_LENGTH).map((row, index) => (
              <TableRow key={index} row={row} snake={snake} food={food} />
            ))}
          </tbody>
        </table>
        <p>Length: {snake.length}</p>
      </React.Fragment>
    );
  }
}

const TableRow = ({
  row,
  snake,
  food,
}: {
  row: number[];
  snake: number[];
  food: number;
}) => {
  return (
    <tr>
      {row.map(cellIndex => {
        return (
          <Cell
            key={cellIndex}
            position={cellIndex}
            snake={snake}
            food={food}
          />
        );
      })}
    </tr>
  );
};

const edgeCase = (position: number) => {
  return (
    (position + 1) % ROW_LENGTH === 0 ||
    (position + 1) % ROW_LENGTH === 1 ||
    _range(ROW_LENGTH).indexOf(position) !== -1 ||
    _range(ROW_LENGTH * ROW_LENGTH)
      .splice(ROW_LENGTH * ROW_LENGTH - ROW_LENGTH, ROW_LENGTH * ROW_LENGTH - 1)
      .indexOf(position) !== -1
  );
};

const Cell = ({
  position,
  snake,
  food,
}: {
  position: number;
  snake: number[];
  food: number;
}) => {
  const color = (position: number) => {
    if (snake.indexOf(position) !== -1) {
      return '#000';
    } else if (position === food) {
      return '#ff0000';
    } else if (edgeCase(position)) {
      return 'orange';
    } else {
      return '#fff';
    }
  };

  return (
    <td
      style={{ width: '0.5rem', height: '0.5rem', background: color(position) }}
    />
  );
};

export default Snake;
