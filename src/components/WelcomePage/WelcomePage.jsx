import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import portfolioIcon from '../../assets/portfolioIcon.webp';

const WelcomePage = () => {
  return (
    <main className={styles.welcomePage}>
      <div className={styles.welcomeContainer}>
        <div className={styles.badge}>Resume Craft</div>
        <h1 className={styles.welcomeHeading}>Craft Your Perfect Resume</h1>
        <p className={styles.para}>
          A simple yet powerful resume builder to help you showcase your skills,
          experience, and achievements—all in one place.
        </p>
        <ul className={styles.features}>
          <li>Four professionally designed templates and custom fonts</li>
          <li>ATS-friendly resume format (text-based &amp; parser-safe)</li>
          <li>With or without profile picture support</li>
          <li>Download high-quality PDF with active layout</li>
          <li>Simple and easy to use interface</li>
        </ul>

        <Link to="/home" className={styles.startBtn}>
          Let&apos;s Craft
        </Link>
        <Link
          className={styles.myPortfolio}
          to="https://www.umarsiddique.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={portfolioIcon}
            className={styles.portfolioIcon}
            alt="portfolio"
          />
          Md Umar Siddique &mdash; Original Creator of <span>Resume Craft</span>
        </Link>
      </div>
    </main>
  );
};

export default WelcomePage;
