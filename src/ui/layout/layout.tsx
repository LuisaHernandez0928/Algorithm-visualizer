import { MoveOptions } from '@globalTypes/index';
import { Grid } from '@sections/grid';
import { Header } from '@sections/header';
import { useState } from 'react';

import styles from './index.module.css';

function LayOut() {
  const [currentOption, setCurrentOption] = useState<MoveOptions>('Start');
  const [cleanWalls, setCleanWalls] = useState<boolean>(false);
  const [execution, setExecution] = useState<boolean>(false);

  const handleOptionChange = (val: MoveOptions): void => {
    setCurrentOption(val);
  };

  const handleCleanWalls = (): void => {
    setCleanWalls(true);
    setTimeout(() => {
      setCleanWalls(false);
    }, 100);
  };

  const handleExecution = (): void => {
    setExecution(true);
  };

  return (
    <div className={styles.layout}>
      <Header
        handleMovementOptions={handleOptionChange}
        notifyCleanWalls={handleCleanWalls}
        notifyRun={handleExecution}
      />
      <Grid currentOption={currentOption} cleanWalls={cleanWalls} runAlgorithm={execution} />
    </div>
  );
}

export { LayOut };
