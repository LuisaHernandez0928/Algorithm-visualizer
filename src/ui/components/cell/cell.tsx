import { GridNode } from '@globalTypes/index';

import styles from './index.module.css';

interface CellProps {
  node: GridNode;
  notifyHover: (row: number, col: number) => any;
  notifyClick: (row: number, col: number) => any;
}
function Cell({ node, notifyHover, notifyClick }: CellProps) {
  const { row, col, nodeType, id } = node;
  const interactionStyle = styles[nodeType];
  return (
    <div
      onClick={() => notifyClick(row, col)}
      className={styles.node + ' ' + interactionStyle}
      key={id}
      id={id}
      onMouseEnter={() => notifyHover(row, col)}
    ></div>
  );
}

export { Cell };
