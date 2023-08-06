import { FC, useEffect, useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  $currentAnswer,
  $currentScore,
  $currentStep,
  $userAnswer,
  $userCombo,
  $userMaxCombo,
} from './StartState';
import { EDirection } from './StartType';
import { ArrowsMapping } from './StartConst';
type IStartScreenProps = {};

export const StartScreen: FC<IStartScreenProps> = ({}) => {
  const [currentAnswer, setCurrentAnswer] = useRecoilState($currentAnswer);
  const [userAnswer, setUserAnswer] = useRecoilState($userAnswer);
  const [currentStep, setCurrentStep] = useRecoilState($currentStep);
  const [currentScore, setCurrentScore] = useRecoilState($currentScore);
  const [userCombo, setUserCombo] = useRecoilState($userCombo);
  const [userMaxCombo, setUserMaxCombo] = useRecoilState($userMaxCombo);

  useEffect(() => {
    console.log('updateStep');
    const randomNumber = Math.floor(Math.random() * 4);
    const currentAnswer = Object.keys(EDirection)[randomNumber] as EDirection;

    console.log('useEffect에서 currentAnswer는', currentAnswer);
    setCurrentAnswer(currentAnswer);
  }, [currentStep]);

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!userAnswer) return;
    checkAnswer();
  }, [userAnswer]);

  const checkAnswer = () => {
    if (currentAnswer === userAnswer) {
      console.log('correct');
      addScoreByCombo();
      setUserCombo((prev) => prev + 1);
      if (userCombo >= userMaxCombo) {
        setUserMaxCombo((prev) => prev + 1);
      }
    } else {
      console.log('incorrect');
      setCurrentScore((prev) => prev - 100);
      setUserCombo(0);
    }

    setCurrentStep((prev) => prev + 1);
    setUserAnswer(null);
  };

  const addScoreByCombo = () => {
    if (userCombo < 10) {
      return setCurrentScore((prev) => prev + 10);
    }
    if (userCombo >= 10 && userCombo < 20) {
      return setCurrentScore((prev) => Math.ceil(prev + userCombo * 1.5));
    }
    if (userCombo >= 20 && userCombo < 50) {
      return setCurrentScore((prev) => prev + userCombo * 2);
    }
    if (userCombo > 50) {
      return setCurrentScore((prev) => prev + userCombo * 10);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        return setUserAnswer(EDirection.UP);
      case 'ArrowDown':
        return setUserAnswer(EDirection.DOWN);
      case 'ArrowLeft':
        return setUserAnswer(EDirection.LEFT);
      case 'ArrowRight':
        return setUserAnswer(EDirection.RIGHT);
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>{ArrowsMapping[currentAnswer]}</div>
      <div>score: {currentScore}</div>

      <div
        style={{
          color:
            userCombo > 4 && userCombo <= 10
              ? 'red'
              : userCombo > 10
              ? 'blue'
              : 'black',
        }}
      >
        COMBO! : {userCombo}
      </div>
      <div>MaxCombo : {userMaxCombo}</div>
    </div>
  );
};
