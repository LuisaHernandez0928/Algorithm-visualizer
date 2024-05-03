import styles from './index.module.css';

function Button({ action, styledButton }: { action: string; styledButton: string }) {
  return <button className={styles[styledButton] + ' ' + styles.basicButton}>{action}</button>;
}

export { Button };
