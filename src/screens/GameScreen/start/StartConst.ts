import { EDirection } from './StartType';

export const ArrowsMapping = {
  [EDirection.UP]: '↑',
  [EDirection.LEFT]: '←',
  [EDirection.RIGHT]: '→',
  [EDirection.DOWN]: '↓',
};

export const UserAnswer = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      return EDirection.UP;

    case 'ArrowDown':
      return EDirection.DOWN;

    case 'ArrowLeft':
      return EDirection.LEFT;

    case 'ArrowRight':
      return EDirection.RIGHT;

    default:
      return null;
  }
};
