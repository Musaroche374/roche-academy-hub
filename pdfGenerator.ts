import { jsPDF } from 'jspdf';
import { TopicLesson, PastPaper } from '../types';

export function generateLessonPdf(lesson: TopicLesson) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // Header Banner
  doc.setFillColor(10, 61, 98); // #0A3D62 Primary Navy
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ROCHE ACADEMY', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(245, 232, 199); // #F5E8C7 Gold / Cream
  doc.text('Science, Math & Geography Hub • rocheacademy.co.tz', margin, 18);
  doc.text('"From ABC to PhD - Science, Math & World Made Simple"', margin, 23);

  cursorY = 38;

  // Metadata badge bar
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, cursorY, contentWidth, 12, 2, 2, 'F');
  
  doc.setTextColor(10, 61, 98);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`LEVEL: ${lesson.level.toUpperCase()} | GRADE: ${lesson.grade.toUpperCase()} | SUBJECT: ${lesson.subject.toUpperCase()}`, margin + 4, cursorY + 7.5);

  cursorY += 20;

  // Lesson Title
  doc.setTextColor(10, 61, 98);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  const titleLines = doc.splitTextToSize(lesson.title, contentWidth);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 7 + 3;

  // Summary intro
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  const introLines = doc.splitTextToSize(lesson.notesContent.introduction, contentWidth);
  doc.text(introLines, margin, cursorY);
  cursorY += introLines.length * 5 + 6;

  // Key Concepts Box
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, cursorY, contentWidth, 14 + (lesson.keyConcepts.length * 4), 2, 2, 'FD');

  doc.setTextColor(79, 70, 229);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('KEY SYLLABUS CONCEPTS:', margin + 4, cursorY + 6);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  let conceptY = cursorY + 12;
  lesson.keyConcepts.forEach((kc, idx) => {
    doc.text(`•  ${kc}`, margin + 6, conceptY);
    conceptY += 4.5;
  });

  cursorY = conceptY + 8;

  // Notes Sections
  lesson.notesContent.sections.forEach((sec) => {
    if (cursorY > 240) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setTextColor(10, 61, 98);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(sec.heading, margin, cursorY);
    cursorY += 6;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const bodyLines = doc.splitTextToSize(sec.body, contentWidth);
    doc.text(bodyLines, margin, cursorY);
    cursorY += bodyLines.length * 4.8 + 4;

    if (sec.formulaOrHighlight) {
      doc.setFillColor(254, 243, 199); // light gold
      doc.setDrawColor(245, 158, 11);
      doc.roundedRect(margin, cursorY, contentWidth, 9, 1, 1, 'FD');
      doc.setTextColor(146, 64, 14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`FORMULA / PRINCIPLE: ${sec.formulaOrHighlight}`, margin + 4, cursorY + 6);
      cursorY += 13;
    }
  });

  // The ROCHE Takeaway
  if (cursorY > 235) {
    doc.addPage();
    cursorY = 20;
  }

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(46, 204, 113); // Leaf Green
  doc.roundedRect(margin, cursorY, contentWidth, 16, 2, 2, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('THE ROCHE METHOD PILLAR:', margin + 4, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  const rocheLines = doc.splitTextToSize(lesson.notesContent.rocheTakeaway, contentWidth - 8);
  doc.text(rocheLines, margin + 4, cursorY + 11);
  cursorY += 22;

  // Exam Tips
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('EXAM & NECTA / CAMBRIDGE TIP:', margin, cursorY);
  cursorY += 5;
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  const tipLines = doc.splitTextToSize(lesson.notesContent.examTips, contentWidth);
  doc.text(tipLines, margin, cursorY);

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Roche Academy Study Notes • Free Offline Educational Edition • Page ${i} of ${pageCount}`,
      margin,
      287
    );
  }

  doc.save(`Roche-Academy-${lesson.id}.pdf`);
}

export function generatePastPaperPdf(paper: PastPaper) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // Header Banner
  doc.setFillColor(10, 61, 98);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('ROCHE ACADEMY PAST PAPERS BANK', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(245, 232, 199);
  doc.text(`${paper.board} Official Syllabus • Low-Data Offline Study Guide`, margin, 18);
  doc.text('rocheacademy.co.tz / rocheacademy.com', margin, 23);

  cursorY = 38;

  // Title Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, cursorY, contentWidth, 20, 2, 2, 'FD');

  doc.setTextColor(10, 61, 98);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(paper.title, margin + 4, cursorY + 7);

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    `Exam Code: ${paper.code} | Year: ${paper.year} | Duration: ${paper.duration} | Marks: ${paper.totalMarks}`,
    margin + 4,
    cursorY + 14
  );

  cursorY += 28;

  // Questions and solutions
  paper.questions.forEach((q) => {
    if (cursorY > 230) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setFillColor(10, 61, 98);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.rect(margin, cursorY, 24, 6, 'F');
    doc.text(`${q.qNum} [${q.marks} Marks]`, margin + 2, cursorY + 4.5);
    cursorY += 10;

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const qLines = doc.splitTextToSize(q.question, contentWidth);
    doc.text(qLines, margin, cursorY);
    cursorY += qLines.length * 5 + 4;

    // Solution box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, cursorY, contentWidth, 8, 1, 1, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('STEP-BY-STEP WORKED SOLUTION & MARKING SCHEME:', margin + 3, cursorY + 5.5);
    cursorY += 12;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const solLines = doc.splitTextToSize(q.solution, contentWidth - 4);
    doc.text(solLines, margin + 2, cursorY);
    cursorY += solLines.length * 4.4 + 4;

    // Roche insight
    doc.setTextColor(46, 204, 113);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`ROCHE METHOD: ${q.rocheInsight}`, margin + 2, cursorY);
    cursorY += 10;
  });

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Roche Academy • Free Downloadable Past Papers • Page ${i} of ${pageCount}`,
      margin,
      287
    );
  }

  doc.save(`Roche-PastPaper-${paper.id}.pdf`);
}
