import React from 'react';

interface ProgramHeroProps {
  title: string;
  subtitle?: string;
  description: string;
}

export default function ProgramHero({ title, subtitle, description }: ProgramHeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {subtitle && (
          <h2 className="text-xl font-normal text-blue-700 mb-4 tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, letterSpacing: '0.125rem' }}>
            {subtitle}
          </h2>
        )}
        <h1 className="text-5xl font-bold mb-6 text-[#203370]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '-0.25rem' }}>
          {title}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, lineHeight: '1.6' }}>
          {description}
        </p>
      </div>
    </section>
  );
}
