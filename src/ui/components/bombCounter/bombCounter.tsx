import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import React, { useState } from 'react';
import { GiUnlitBomb } from 'react-icons/gi';

import styles from './index.module.css';

function BombCounter() {
  const [count, setCount] = useState(1);

  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '150px',
        height: '100%',
      }}
    >
      <div className={styles.bombIcon}>
        <Badge color="secondary" badgeContent={count}>
          <GiUnlitBomb size={30} />
        </Badge>
      </div>
      <div className={styles.counter}>
        <ButtonGroup>
          <Button
            sx={{ borderColor: 'purple', color: 'purple' }}
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon sx={{ fontSize: 15 }} />
          </Button>
          <Button
            sx={{ borderColor: 'purple', color: 'purple' }}
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon sx={{ fontSize: 15 }} />
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}

export { BombCounter };
