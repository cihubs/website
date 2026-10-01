import React from 'react';

interface ProgramPhaseProps {
  title: string;
  duration?: string;
  content: string;
  link?: string;
}

export default function ProgramPhase({ title, duration, content, link }: ProgramPhaseProps) {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-[#203370]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          {title}
        </h3>
        {duration && (
          <span className="text-sm text-gray-600 ml-4 mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
            {duration}
          </span>
        )}
      </div>
      <div
        className="text-gray-700 mb-4 prose prose-sm max-w-none"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {link && (
        <a
          href={link}
          className="inline-block px-6 py-3 bg-[#203370] text-white rounded-lg font-bold text-center transition-colors hover:bg-[#2a4289]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.0625rem' }}
        >
          Ver más
        </a>
      )}
    </div>
  );
}
