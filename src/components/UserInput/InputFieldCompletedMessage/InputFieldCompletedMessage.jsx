import styles from './InputFieldCompletedMessage.module.css';

const CompletedInputMessage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.messageBox}>
        <h2 className={styles.heading}>You're All Set!</h2>
        <p className={styles.description}>
          <span className={styles.highlight}>Congratulations!</span> You've
          crafted your Resume.
        </p>
        <p className={styles.instruction}>
          Click the <span className={styles.highlight}>"Submit"</span> button
          below to generate and download your resume.
        </p>
      </div>
    </section>
  );
};

export default CompletedInputMessage;
