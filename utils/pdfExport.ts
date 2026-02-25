
import { jsPDF } from 'jspdf';
import { User, LevelResult } from '../types';

export const exportResultsToPdf = (user: User, results: LevelResult[]) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('nl-NL');
  const time = new Date().toLocaleTimeString('nl-NL');

  doc.setFontSize(22);
  doc.setTextColor(200, 0, 0); // Summa Red
  doc.text('Patroon Slots – Resultaat', 20, 20);

  doc.setFontSize(14);
  doc.setTextColor(51, 51, 51);
  doc.text(`Student: ${user.name}`, 20, 35);
  doc.text(`Klas: ${user.classGroup}`, 20, 42);
  doc.text(`Datum: ${date} om ${time}`, 20, 49);

  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  let y = 65;
  doc.setFontSize(12);
  doc.text('Level', 20, y);
  doc.text('Type', 50, y);
  doc.text('Pogingen', 90, y);
  doc.text('Sterren', 130, y);

  doc.line(20, y + 2, 190, y + 2);
  y += 10;

  results.forEach((res, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${res.levelId}`, 20, y);
    doc.text(`${res.type}`, 50, y);
    doc.text(`${res.attempts}`, 90, y);
    doc.text(`${'⭐'.repeat(res.stars)}`, 130, y);
    y += 8;
  });

  const totalStars = results.reduce((sum, r) => sum + r.stars, 0);
  y += 10;
  doc.setFontSize(14);
  doc.text(`Totaal aantal sterren: ${totalStars} / 60`, 20, y);

  doc.save(`PatroonSlots_${user.classGroup}_${date.replace(/\//g, '-')}.pdf`);
};
