import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { $currentScore } from '../../StartState';

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
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gaugeWidth, setGaugeWidth] = useState('100%');
  const currentScore = useRecoilValue($currentScore);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!showIntro) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showIntro]);

  useEffect(() => {
    setGaugeWidth(`${(timeLeft / initialTime) * 100}%`);

    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, initialTime, onTimeUp]);

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
          {timeLeft}
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
