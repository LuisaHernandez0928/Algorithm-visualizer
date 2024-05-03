import { clockActions } from '@globalTypes/index';
import React, { useRef, useState } from 'react';

import styles from './index.module.css';

function StopWatch() {
  const [currentState, setCurrentState] = useState<clockActions>('INITIAL');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const intervalRef = useRef<number>(0);

  const onStart = () => {
    if (currentState === 'START') return;
    setCurrentState('START');
    intervalRef.current = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + 50);
    }, 50);
  };

  const onStop = () => {
    if (currentState === 'STOP') return;
    setCurrentState('STOP');
    clearInterval(intervalRef.current);
  };

  const onReset = () => {
    setCurrentTime(0);
  };
  const sec = Math.floor(currentTime / 1000);
  const min = Math.floor(sec / 60);
  const milliseconds = (currentTime % 1000).toString().padStart(3, '0');
  const seconds = (sec % 60).toString().padStart(2, '0');
  const minutes = (min % 60).toString().padStart(2, '0');

  return (
    <div className={styles.stopWatch}>
      <div className={styles.timer}>
        <span style={{ color: 'var(--blue-violet)' }}>{minutes}</span>:
        <span style={{ color: 'var(--blue-violet)' }}>{seconds}</span>:
        <span style={{ color: 'var(--blue-violet)' }}>{milliseconds}</span>
      </div>
    </div>
  );
}

export { StopWatch };
