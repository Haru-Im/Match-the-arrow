'use client';

import { memo, useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  $currentScore,
  $currentStep,
  $userAnswer,
  $userCombo,
  $userMaxCombo,
} from './StartState';
import { EDirection } from './StartType';
import { ArrowsMapping } from './StartConst';
import { $stepIndex } from '../GameState';
import { EStep } from '../GameType';
import { useTimer } from 'use-timer';

type IStartScreenProps = {};

export const StartScreen = memo<IStartScreenProps>(({}) => {
  const [userAnswer, setUserAnswer] = useRecoilState($userAnswer);
  const [currentStep, setCurrentStep] = useRecoilState($currentStep);
  const [currentScore, setCurrentScore] = useRecoilState($currentScore);
  const [userCombo, setUserCombo] = useRecoilState($userCombo);
  const [userMaxCombo, setUserMaxCombo] = useRecoilState($userMaxCombo);
  const [gameStep, setGameStep] = useRecoilState($stepIndex);

  const { time } = useTimer({
    timerType: 'DECREMENTAL',
    initialTime: 3,
    step: 1,
    endTime: 0,
    autostart: true,
    onTimeOver: () => {
      setGameStep(EStep.START);
    },
  });

  const [question, setQuestion] = useState<EDirection[]>([
    null,
    null,
    //@ts-ignore
    Object.keys(EDirection)[Math.floor(Math.random() * 4)],
    //@ts-ignore
    Object.keys(EDirection)[Math.floor(Math.random() * 4)],
    //@ts-ignore
    Object.keys(EDirection)[Math.floor(Math.random() * 4)],
  ]);

  const answer = question[2];

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    //change Question
    if (currentStep === 1) return;
    const leftfourquestions = question.slice(1);
    const newQuestionElement = Object.keys(EDirection)[
      Math.floor(Math.random() * 4)
    ] as EDirection;
    const newQuestions = [...leftfourquestions, newQuestionElement];

    console.log('change');
    setQuestion(newQuestions);
  }, [currentStep]);

  useEffect(() => {
    if (!userAnswer) return;
    checkAnswer();
  }, [userAnswer]);

  const checkAnswer = () => {
    if (answer === userAnswer) {
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

  if (gameStep === EStep.READY) {
    return <div>{time}</div>;
  }

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
      <div style={{ display: 'flex' }}>
        {question.map((e, i) => {
          if (!e) {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  width: 50,
                  aspectRatio: 1,
                  backgroundColor: 'red',
                  alignItems: 'center',
                }}
              ></div>
            );
          }

          if (i === 2) {
            return (
              <div
                key={i}
                style={{
                  width: 50,
                  display: 'flex',
                  aspectRatio: 1,
                  backgroundColor: 'red',
                  fontSize: 24,
                  fontWeight: 800,
                  alignItems: 'center',
                }}
              >
                {ArrowsMapping[e]}
              </div>
            );
          }
          return (
            <div
              key={i}
              style={{
                width: 50,
                display: 'flex',
                aspectRatio: 1,
                backgroundColor: 'red',
                alignItems: 'center',
              }}
            >
              {ArrowsMapping[e]}
            </div>
          );
        })}
      </div>
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
});
