import { useContext, useEffect, useState } from 'react';
import styles from './DisplayTemplate.module.css';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import StandardTemplate from './StandardTemplate/StandardTemplate';
import ClassicTemplate from './ClassicTemplate/ClassicTemplate';
import ATSFriendlyTemplate from './ATSFriendlyTemplate/ATSFriendlyTemplate';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { toast } from 'react-toastify';
import BoldAccentTemplate from './BoldAccentTemplate/BoldAccentTemplate';

const Display = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);
  const [templateState, setTemplateState] = useState('boldAccentTemplate');
  const [fontStyleState, setFontStyleState] = useState('arialFont');
  const [hiddenBtnState, setHiddenBtnState] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const Navigate = useNavigate();
  const pdfRef = useRef();

  const personName = stateField.personalInfoInput.fullName
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();

  const templateArray = {
    boldAccentTemplate: <BoldAccentTemplate fontStyle={fontStyleState} />,
    standardTemplate: <StandardTemplate fontStyle={fontStyleState} />,
    classicTemplate: <ClassicTemplate fontStyle={fontStyleState} />,
    atsFriendlyTemplate: 'atsFriendlyTemplate',
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    if (window.location.href.includes('/resumeCrafted')) {
      setHiddenBtnState(false);
    } else {
      setHiddenBtnState(true);
    }
  }, [hiddenBtnState]);

  const selectTemplate = (e) => {
    toast.dismiss();
    const selectedTemplate = e.target.value;

    setTemplateState(selectedTemplate);

    const extractedTemplateName = selectedTemplate
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase())
      .trim();
    toast.success(`${extractedTemplateName} is selected`);
  };

  const upperCaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChangeFont = (e) => {
    const raw = e.target.value;
    setFontStyleState(raw);

    const extractedFontName = raw
      .replace(/Font$/, '')
      .replace(/([A-Z])/g, ' $1')
      .trim();

    const fontName = upperCaseFirstLetter(extractedFontName);

    toast.dismiss();
    toast.success(`Font Changed to ${fontName}`);
  };

  const handleEditBtn = () => {
    Navigate('/builder');
    toast.info('Back to Editing');
  };

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3, // High quality
      useCORS: true,
      scrollY: -window.scrollY,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    const marginBuffer = 2;

    while (heightLeft > marginBuffer) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${personName}-resume-craft.pdf`);
    toast.success('Resume Downloading');
  };

  return (
    <section
      className={`
        ${styles.displaySection}
        ${hiddenBtnState && styles.hideDisplay}
        ${!hiddenBtnState && styles.unhideDisplay}`}
    >
      <div className={styles.dots} />

      <div className={styles.displayBtnWrapper}>
        {!hiddenBtnState && (
          <>
            {/* template font style */}
            {templateState !== 'atsFriendlyTemplate' && (
              <div className={styles.selectsStyle}>
                <label className={styles.templateLabel} htmlFor="fontStyle">
                  Font Style:{' '}
                </label>
                <select
                  onChange={handleChangeFont}
                  name="fontStyle"
                  id="fontStyle"
                  className={styles.templateStylesChange}
                >
                  <optgroup label="Select Font Style">
                    <option value="arialFont">Arial</option>
                    <option value="sansSerifFont">Sans Serif</option>
                    <option value="googleSansCodeFont">Google Sans Code</option>
                    <option value="robotoFont">Roboto</option>
                    <option value="poppinsFont">Poppins</option>
                    <option value="playwriteFont">Playwrite</option>
                    <option value="DeliusSwashCapsFont">
                      Delius Swash Caps Font
                    </option>
                    <option value="rubikDistressedFont">
                      Rubik Distressed
                    </option>
                  </optgroup>
                </select>
              </div>
            )}

            {/* Select Template */}

            <div className={styles.selectsStyle}>
              <label className={styles.templateLabel} htmlFor="templates">
                Select Template:{' '}
              </label>
              <select
                onChange={(e) => selectTemplate(e)}
                name="templates"
                id="templates"
                className={styles.templateStylesChange}
              >
                <option value="boldAccentTemplate">Bold Accent Template</option>
                <option value="standardTemplate">Standard Template</option>
                <option value="classicTemplate">Classic Template</option>
                <option value="atsFriendlyTemplate">
                  ATS Friendly Template
                </option>
              </select>
            </div>

            {/* Back to Input Button */}
            <button className={styles.backToInputBtn} onClick={handleEditBtn}>
              Edit Resume
            </button>

            {/* Download as PDF Button */}

            {templateState !== 'atsFriendlyTemplate' && (
              <button
                className={styles.downloadBtn}
                onClick={handleDownloadPdf}
              >
                Download as PDF
              </button>
            )}

            {templateState === 'atsFriendlyTemplate' && (
              <PDFDownloadLink
                className={styles.downloadBtn}
                document={<ATSFriendlyTemplate data={stateField} />}
                fileName={`${personName}-ats-resume.pdf`}
              >
                {({ loading }) =>
                  loading ? 'Preparing ATS PDF...' : 'Download ATS Template'
                }
              </PDFDownloadLink>
            )}
          </>
        )}
      </div>
      {templateState !== 'atsFriendlyTemplate' && (
        <div className={styles.templateParent} ref={pdfRef}>
          {templateArray[templateState]}
        </div>
      )}

      {templateState === 'atsFriendlyTemplate' &&
        (isMobile ? (
          <div className={styles.mobilePdfMessage}>
            <h3>Preview Unavailable on Mobile</h3>
            <br />
            <p>
              Mobile browsers cannot display live PDF previews. Please use the{' '}
              <strong>Download ATS Template</strong> button above to view and
              save your resume.
            </p>
          </div>
        ) : (
          <PDFViewer width="100%" height="1000">
            <ATSFriendlyTemplate data={stateField} />
          </PDFViewer>
        ))}
    </section>
  );
};

export default Display;
