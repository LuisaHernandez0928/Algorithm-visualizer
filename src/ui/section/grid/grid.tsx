import { Cell } from '@components/cell';
import { GridNode, MoveOptions, NodeType } from '@globalTypes/index';
import React, { useEffect, useState } from 'react';

import styles from './index.module.css';
import { buildGraph, dijkstra, getShortestPath } from './utils';

const isWall = (i: number, j: number, walls: Array<[number, number]>): boolean => {
  let isWall = false;
  for (const wall of walls) {
    if (wall[0] === i && wall[1] === j) {
      isWall = true;
      break;
    }
  }
  return isWall;
};

const getGrid = (
  numberOfRows: number,
  CELL_SIZE: number,
  startNode: [number, number],
  endNode: [number, number],
  walls: Array<[number, number]>
) => {
  const widthUserScreen = window.innerWidth;
  const numberOfCellPerCol = Math.ceil(widthUserScreen / CELL_SIZE);
  const grid: Array<GridNode[]> = [];
  for (let i = 0; i < numberOfRows; i++) {
    const rows: GridNode[] = [];
    for (let j = 0; j < numberOfCellPerCol; j++) {
      let nodeType: NodeType = 'basicNode';
      if (startNode[0] === i && startNode[1] === j) nodeType = 'startNode';
      if (endNode[0] === i && endNode[1] === j) nodeType = 'endNode';
      if (isWall(i, j, walls)) nodeType = 'wallNode';
      rows.push({
        id: 'row:' + i + ',col:' + j,
        row: i,
        col: j,
        nodeType,
      });
    }
    grid.push(rows);
  }
  return grid;
};

function Grid({
  currentOption,
  cleanWalls,
  runAlgorithm,
}: {
  currentOption: MoveOptions;
  cleanWalls: boolean;
  runAlgorithm: boolean;
}) {
  const CELL_SIZE = 25;

  const HORIZONTAL_DISTANCE = Math.ceil(window.innerWidth / (CELL_SIZE * 3));

  const totalHeight = window.innerHeight;
  const headerHeight = totalHeight * 0.15;
  const headerRows = headerHeight / CELL_SIZE;
  const maxRows = totalHeight / CELL_SIZE;
  const middleRow = maxRows / 2;
  const adjustedMiddleRow = middleRow - headerRows;
  const numberOfRows = Math.ceil((totalHeight - headerHeight) / CELL_SIZE) + 5;
  const START_NODE_ROW = Math.ceil(adjustedMiddleRow);
  const START_NODE_COL = HORIZONTAL_DISTANCE;
  const END_NODE_ROW = START_NODE_ROW;
  const END_NODE_COL = HORIZONTAL_DISTANCE * 2;

  const [totalRows, setTotalRows] = useState(numberOfRows);
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [currentStart, setCurrentStart] = useState<[number, number]>([START_NODE_ROW, START_NODE_COL]);
  const [currentEnd, setCurrentEnd] = useState<[number, number]>([END_NODE_ROW, END_NODE_COL]);
  const [walls, setWalls] = useState<Array<[number, number]>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (cleanWalls) setWalls([]);
  }, [cleanWalls]);

  useEffect(() => {
    if (runAlgorithm) {
      visualizeDijkstra();
    }
  }, [runAlgorithm]);

  useEffect(() => {
    setGrid(getGrid(totalRows, CELL_SIZE, currentStart, currentEnd, walls));
  }, []);

  useEffect(() => {
    setGrid(getGrid(totalRows, CELL_SIZE, currentStart, currentEnd, walls));
  }, [totalRows, currentStart, currentEnd, walls]);

  const expandGrid = () => {
    setTotalRows((prev) => prev + 5);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    const positionScroll = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
    if (positionScroll >= 85) expandGrid();
  };

  const handleHover = (row: number, col: number): void => {
    if (currentOption !== 'Wall') return;
    if (!isDragging) return;
    setWalls((prev) => {
      const mNew = [...prev, [row, col]];
      const noDuplicates: [number, number][] = [...new Set(mNew)] as [number, number][];
      return noDuplicates;
    });
  };

  const handleCellClick = (row: number, col: number): void => {
    if (currentOption === 'Start') {
      if (currentEnd[0] !== row || currentEnd[1] !== col) setCurrentStart([row, col]);
    } else if (currentOption === 'End') {
      if (currentStart[0] !== row || currentStart[1] !== col) setCurrentEnd([row, col]);
    } else if (currentOption === 'Wall') {
      if (currentEnd[0] === row && currentEnd[1] === col) return;
      if (currentStart[0] === row && currentStart[1] === col) return;
      setWalls((prev) => {
        const mNew = [...prev, [row, col]];
        const noDuplicates: [number, number][] = [...new Set(mNew)] as [number, number][];
        return noDuplicates;
      });
    }
  };

  const animateDijkstra = (visitedNodesInOrder: string[], shortestPath: string[]) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(node);
        if (element != null) element.className += ' ' + styles.nodeVisited;
      }, 10 * i);
    }
    setTimeout(() => {
      animateShortestPath(shortestPath);
    }, 10 * visitedNodesInOrder.length);
  };

  const animateShortestPath = (shortestPath: string[]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const element = document.getElementById(node);
        if (element != null) element.className += ' ' + styles.nodeShortestPath;
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const graph = buildGraph(grid);
    const startNode = graph.getNodeById(graph.nodes, 'row:' + currentStart[0] + ',col:' + currentStart[1]);
    const endNode = graph.getNodeById(graph.nodes, 'row:' + currentEnd[0] + ',col:' + currentEnd[1]);
    const visitedNodesInOrder = dijkstra(graph, startNode, endNode);
    const shortestPath = getShortestPath(startNode, endNode);
    animateDijkstra(visitedNodesInOrder, shortestPath);
  };

  return (
    <div className={styles.gridContainer}>
      <div
        className={styles.boardContainer}
        onScroll={(e) => handleScroll(e)}
        onMouseDown={() => {
          setIsDragging(true);
        }}
        onMouseUp={() => {
          setIsDragging(false);
        }}
      >
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ width: '100%', display: 'flex' }}>
              {row.map((node, colIndex) => {
                return (
                  <Cell key={colIndex} node={node} notifyHover={handleHover} notifyClick={handleCellClick} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Grid };
