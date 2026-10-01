import React from 'react';

interface ProgramCTAProps {
  contactLink: string;
}

export default function ProgramCTA({ contactLink }: ProgramCTAProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#203370] mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
          LE INVITAMOS A CRECER CON CIHUBS
        </h2>
        <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
          Contáctenos
        </p>
        <a
          href={contactLink}
          className="inline-block px-8 py-4 bg-[#203370] text-white rounded-lg font-bold text-center transition-colors hover:bg-[#2a4289]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.0625rem' }}
        >
          CONTÁCTENOS
        </a>
      </div>
    </section>
  );
}
