import { atom } from 'recoil';
import { EStep } from './GameType';

export const $stepIndex = atom<EStep>({
  key: 'stepIndex',
  default: EStep.READY,
});
