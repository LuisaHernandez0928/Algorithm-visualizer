import { BombCounter } from '@components/bombCounter';
import { Button } from '@components/button';
import { DropdownList } from '@components/dropDownList';
import { StopWatch } from '@components/stopWatch';
import algorithms from '@data/algorithms';
import patterns from '@data/pattern';
import { MoveOptions } from '@globalTypes/index';
import React, { useState } from 'react';

import styles from './index.module.css';

function Header({
  handleMovementOptions,
  notifyCleanWalls,
  notifyRun,
}: {
  handleMovementOptions: (val: MoveOptions) => void;
  notifyCleanWalls: () => void;
  notifyRun: () => void;
}) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.drowDown}>
        <div className={styles.algorithms}>
          <DropdownList data={algorithms} type={'Algorithms'} placeholder={'Select the algorithm'} />
        </div>
        <div className={styles.algorithms}>
          <DropdownList data={patterns} type="Patterns" placeholder={'Select the pattern'} />
        </div>
      </div>
      <div className={styles.centerContainer}>
        <StopWatch />
        <div className={styles.visualize} onClick={notifyRun}>
          <Button action={'Visualize'} styledButton={'visualizeAlgorithm'} />
        </div>
      </div>
      <div className={styles.tools}>
        <div className={styles.bombContainer}>
          <BombCounter />
          <span>Add/Remove bombs</span>
        </div>
        <div className={styles.selectContainer}>
          <select onChange={(e) => handleMovementOptions(e.target.value as MoveOptions)}>
            <option>Start</option>
            <option>End</option>
            <option>Wall</option>
          </select>
        </div>
        <div className={styles.clearButton} onClick={notifyCleanWalls}>
          <Button action={'Clear board'} styledButton={'clearButton'} />
        </div>
      </div>
    </div>
  );
}

export { Header };
