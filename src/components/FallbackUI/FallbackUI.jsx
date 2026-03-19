import logo from '/favicon.ico';
import styles from './FallbackUI.module.css';

const FallbackUI = () => {
  return (
    <div className={styles.fallback}>
      <img height="100px" src={logo} alt="logo" />
      <h1>Loading...</h1>
    </div>
  );
};

export default FallbackUI;
