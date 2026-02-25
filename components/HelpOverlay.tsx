
import React from 'react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpOverlay: React.FC<HelpOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-summa-red text-gray-700 hover:text-white rounded-full font-bold transition"
          aria-label="Sluit hulp"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-summa-red mb-4">Hulp nodig?</h2>
        <div className="space-y-4 text-lg text-summa-dark">
          <p>• Een patroon is iets dat terug komt.</p>
          <p>• Kijk goed naar de eerste plaatjes.</p>
          <p>• Zie je <b>A - B - A - B</b>? Dan komt daarna weer <b>A</b>.</p>
          <p>• Soms moet je tellen. Soms moet je de fout zoeken.</p>
          <p>• Neem de tijd. Je hoeft niet te haasten.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-summa-red text-white font-bold rounded-lg hover:bg-red-700 transition"
        >
          Ik snap het!
        </button>
      </div>
    </div>
  );
};

export default HelpOverlay;
