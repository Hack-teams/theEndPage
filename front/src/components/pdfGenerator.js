// pdfGenerator.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exporte un élément HTML en PDF
 * @param {HTMLElement} element - L'élément DOM à exporter
 * @param {string} filename - Nom du fichier PDF (sans extension)
 * @param {Object} options - Options supplémentaires
 * @param {string} [options.orientation='portrait'] - Orientation du PDF (portrait/paysage)
 * @param {string} [options.unit='mm'] - Unité de mesure (mm, cm, in, px)
 * @param {string} [options.format='a4'] - Format de page (a4, letter, etc.)
 * @param {number} [options.quality=1] - Qualité de l'image (0 à 1)
 * @param {number} [options.scale=2] - Échelle de rendu
 * @returns {Promise<void>}
 */
export const toPdf = async (element, filename = 'document', options = {}) => {
  const {
    orientation = 'portrait',
    unit = 'mm',
    format = 'a4',
    quality = 1,
    scale = 2
  } = options;

  try {
    // Capture l'élément en canvas
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
      quality
    });

    // Calcul des dimensions
    const imgData = canvas.toDataURL('image/jpeg', quality);
    const pdf = new jsPDF({
      orientation,
      unit,
      format
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calcul du ratio pour fit la page
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    // Positionnement centré
    const marginX = (pageWidth - finalWidth) / 2;
    const marginY = (pageHeight - finalHeight) / 2;

    // Ajout de l'image au PDF
    pdf.addImage(imgData, 'JPEG', marginX, marginY, finalWidth, finalHeight);
    
    // Sauvegarde du fichier
    pdf.save(`${filename}.pdf`);
    
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw error;
  }
};

/**
 * Version alternative avec découpage en plusieurs pages si le contenu est trop long
 */
export const toPdfMultiPage = async (element, filename = 'document', options = {}) => {
  const {
    orientation = 'portrait',
    unit = 'mm',
    format = 'a4',
    quality = 1,
    scale = 2,
    margin = 10
  } = options;

  try {
    const pdf = new jsPDF({
      orientation,
      unit,
      format
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const canvas = await html2canvas(element, {
      scale,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/jpeg', quality);
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let position = 0;
    let remainingHeight = imgHeight;

    while (remainingHeight > 0) {
      pdf.addImage(
        imgData,
        'JPEG',
        margin,
        margin - position,
        imgWidth,
        imgHeight
      );
      
      remainingHeight -= pageHeight;
      position += pageHeight - margin;

      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }

    pdf.save(`${filename}.pdf`);
    
  } catch (error) {
    console.error('Erreur lors de la génération du PDF multipage:', error);
    throw error;
  }
};