import React from 'react';

interface ProgramComponentProps {
  title: string;
  content: string;
  list?: string[];
}

export default function ProgramComponent({ title, content, list }: ProgramComponentProps) {
  return (
    <div className="mb-6 p-5 bg-gray-50 rounded-lg">
      <h4 className="text-xl font-bold text-[#203370] mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
        {title}
      </h4>
      <div
        className="text-gray-700 mb-4 prose prose-sm max-w-none"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {list && list.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 space-y-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
