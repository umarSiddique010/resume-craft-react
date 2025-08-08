import { useState } from 'react';
import classNames from 'classnames';
import Styles from './Display.module.css';
import TemplateOne from './Template_One/TemplateOne';
import TemplateTwo from './Template_Two/TemplateTwo';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Display = ({
  basicInfoField,
  addressField,
  websitesField,
  careerSummaryInput,
  workExperiencesField,
  educationField,
  skillField,
  projectField,
  certificationField,
  awardsAchievementsField,
  languagesField,
  interestsHobbiesField,
  isHiddenInput,
  setIsHiddenInput,
  skipField,
}) => {
  const [fontStyle, setFontStyle] = useState('Change Font');
  const [changeTemplate, setChangeTemplate] = useState('Change Template');
  const pdfRef = useRef();

  const unhideDisplay = isHiddenInput && 'unhide-display-section';

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    pdf.addImage(
      imgData,
      'PNG',
      (pageWidth - scaledWidth) / 2,
      0,
      scaledWidth,
      scaledHeight,
    );

    pdf.save('Your-Resume-CV-Builder.pdf');
  };

  const templateArray = [
    <TemplateOne
      basicInfoField={basicInfoField}
      addressField={addressField}
      websitesField={websitesField}
      careerSummaryInput={careerSummaryInput}
      workExperiencesField={workExperiencesField}
      educationField={educationField}
      skillField={skillField}
      projectField={projectField}
      certificationField={certificationField}
      awardsAchievementsField={awardsAchievementsField}
      languagesField={languagesField}
      interestsHobbiesField={interestsHobbiesField}
      skipField={skipField}
      fontStyle={fontStyle}
    />,

    <TemplateTwo
      basicInfoField={basicInfoField}
      addressField={addressField}
      websitesField={websitesField}
      careerSummaryInput={careerSummaryInput}
      workExperiencesField={workExperiencesField}
      educationField={educationField}
      skillField={skillField}
      projectField={projectField}
      certificationField={certificationField}
      awardsAchievementsField={awardsAchievementsField}
      languagesField={languagesField}
      interestsHobbiesField={interestsHobbiesField}
      skipField={skipField}
      fontStyle={fontStyle}
    />,
  ];

  return (
    <section
      className={classNames(
        Styles.display_section,
        'global-display-section-class',
        unhideDisplay,
      )}
    >
      <div className={classNames(Styles.display_btn_wrapper, 'btn-wrapper')}>
        {isHiddenInput && (
          <>
            <button className={Styles.download_btn} onClick={handleDownloadPdf}>
              Download as PDF
            </button>

            <button
              className={Styles.back_to_input_btn}
              onClick={() => setIsHiddenInput(false)}
            >
              Edit Resume/CV
            </button>
          </>
        )}

        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
          name="fontStyle"
          id={Styles.fontStyle}
        >
          <option value="Change Font">Change Font</option>
          <optgroup>
            <option value="Arial">Arial</option>
            <option value="sans-serif">sans-serif</option>
            <option value="Geneva">Geneva</option>
            <option value="Lucida Grande">Lucida Grande</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Cochin">Cochin</option>
          </optgroup>
        </select>

        <select
          value={changeTemplate}
          onChange={(e) => setChangeTemplate(e.target.value)}
          name="changeTemplate"
          id={Styles.changeTemplate}
        >
          <option value="Change Template">Change Template</option>
          <optgroup>
            <option value="TemplateOne">Template One</option>
            <option value="TemplateTwo">Template Two</option>
          </optgroup>
        </select>
      </div>

      <div className={Styles.template_parent} ref={pdfRef}>
        {templateArray[changeTemplate === 'TemplateTwo' ? 1 : 0]}
      </div>
    </section>
  );
};

export default Display;
