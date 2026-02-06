import Display from '../DisplayTemplate/DisplayTemplate';
import UserInput from '../UserInput/UserInput';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <UserInput />
      <Display />
    </main>
  );
};

export default HomePage;
