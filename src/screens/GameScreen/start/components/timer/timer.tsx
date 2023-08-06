import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { $currentScore } from '../../StartState';
import { useTimer } from 'use-timer';
import { $stepIndex } from '../../../GameState';
import { EStep } from '../../../GameType';

interface Timer {
  showIntro: boolean;
  initialTime: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<Timer> = ({
  showIntro,
  initialTime,
  onTimeUp,
}) => {
  const [gaugeWidth, setGaugeWidth] = useState('100%');
  const [gameStep, setGameStep] = useRecoilState($stepIndex);
  const currentScore = useRecoilValue($currentScore);

  const { time } = useTimer({
    timerType: 'DECREMENTAL',
    initialTime: 60,
    step: 1,
    endTime: 0,
    autostart: gameStep === EStep.START,
    onTimeOver: () => {
      setGameStep(EStep.END);
    },
  });

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: 'border-box',
        paddingTop: 12,
        backgroundColor: 'red',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          border: `1px solid beige`,
          borderRadius: 999,
          overflow: 'hidden',
          alignItems: 'center',
          boxSizing: 'border-box',
          paddingRight: 12,
        }}
      >
        <div
          style={{
            backgroundColor: '#f6eddf',
            height: '20px',
            width: gaugeWidth,
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 10,
            paddingLeft: 12,
            color: 'white',
          }}
        >
          {time}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 0,
          paddingLeft: 24,
          fontSize: '1px',
          whiteSpace: 'nowrap',
          color: 'white',
        }}
      >
        Score : {currentScore}
      </div>
    </div>
  );
};
