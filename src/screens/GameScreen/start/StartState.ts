import { atom } from 'recoil';
import { EDirection } from './StartType';

export const $currentAnswer = atom<EDirection | null>({
  key: 'currentAnswer',
  default: null,
});

export const $currentStep = atom<number>({
  key: 'currentStep',
  default: 1,
});

export const $userAnswer = atom<EDirection | null>({
  key: 'userAnswer',
  default: null,
});

export const $currentScore = atom<number>({
  key: 'currentScore',
  default: 0,
});
