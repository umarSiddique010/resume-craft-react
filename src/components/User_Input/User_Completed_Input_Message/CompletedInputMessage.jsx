import classNames from 'classnames';
import Styles from './CompletedInputMessage.module.css';

const CompletedInputMessage = () => {
  return (
    <section className={classNames(Styles.container, 'component-section')}>
      <div className={Styles.message_box}>
        <h2 className={Styles.heading}>You're All Set!</h2>
        <p className={Styles.description}>
          <span className={Styles.highlight}>Congratulations!</span> You've
          completed your CV.
        </p>
        <p className={Styles.instruction}>
          Click the <span className={Styles.highlight}>"Submit"</span> button
          below to generate and download your resume.
        </p>
      </div>
    </section>
  );
};

export default CompletedInputMessage;
