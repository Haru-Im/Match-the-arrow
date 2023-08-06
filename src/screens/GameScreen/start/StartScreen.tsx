import { FC, useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { $currentAnswer, $currentScore, $currentStep } from './StartState';
import { EDirection } from './StartType';
import { ArrowsMapping } from './StartConst';
import { Timer } from './components';
type IStartScreenProps = {};

export const StartScreen: FC<IStartScreenProps> = ({}) => {
  const [currentAnswer, setCurrentAnswer] = useRecoilState($currentAnswer);
  const [currentStep, setCurrentStep] = useRecoilState($currentStep);
  const setCurrentScore = useSetRecoilState($currentScore);

  useEffect(() => {
    console.log('updateStep');
    const randomNumber = Math.floor(Math.random() * 4);
    const currentAnswer = Object.keys(EDirection)[randomNumber] as EDirection;

    console.log(333, currentAnswer);
    setCurrentAnswer(currentAnswer);
  }, [currentStep]);

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const checkAnswer = (userAnswer: EDirection) => {
    console.log(33333, currentAnswer, userAnswer);
    if (currentAnswer === userAnswer) {
      console.log('correct');
      setCurrentScore((prev) => prev + 100);
    } else {
      console.log('incorrect');
      setCurrentScore((prev) => prev - 10);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        return checkAnswer(EDirection.UP);
      case 'ArrowDown':
        return checkAnswer(EDirection.DOWN);
      case 'ArrowLeft':
        return checkAnswer(EDirection.LEFT);
      case 'ArrowRight':
        return checkAnswer(EDirection.RIGHT);
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
      }}
    >
      <div>
        <Timer showIntro={false} initialTime={60} onTimeUp={() => {}} />
      </div>
      <div>{ArrowsMapping[currentAnswer]}</div>
      <div></div>
    </div>
  );
};
