import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import { FaGithub } from 'react-icons/fa';

const WelcomePage = () => {
  return (
    <main className={styles.WelcomePage}>
      <div className={styles.WelcomeContainer}>
        <h1 className={styles.WelcomeHeading}>Craft Your Perfect Resume</h1>
        <p className={styles.para}>
          A simple yet powerful resume builder to help you showcase your skills,
          experience, and achievements—all in one place.
        </p>
        <ul className={styles.features}>
          <li>Three professionally designed templates and Custom fonts</li>
          <li>ATS-friendly resume format (text-based & parser-safe)</li>
          <li>With or without profile picture support</li>
          <li>Download high-quality PDF with active layout</li>
        </ul>

        <Link to="/home" className={styles.startBtn}>
          Let's Craft
        </Link>
        <Link
          className={styles.myGithub}
          to="https://github.com/umarSiddique010"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} className={styles.githubIcon} />
          Md Umar Siddique &mdash; Original Creator of <span>Resume Craft</span>
        </Link>
      </div>
    </main>
  );
};

export default WelcomePage;
