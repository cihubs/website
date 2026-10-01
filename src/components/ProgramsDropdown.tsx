import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { ChevronDown } from 'flowbite-react/icons';

interface Program {
  title: string;
  href: string;
}

interface ProgramsDropdownProps {
  programs?: Program[];
}

const defaultPrograms: Program[] = [
  { title: 'Soft Landing de Conocimiento e Innovación', href: '/programas/soft-landing-de-conocimiento-e-innovacion/' },
  { title: 'Potenciar Zonas Francas a High-Tech', href: '/programas/potenciar-zonas-francas-a-high-tech/' },
  { title: 'Encadenamientos Globales', href: '/programas/encadenamientos-globales/' },
  { title: 'Ciudades Científicas y Tecnológicas', href: '/programas/ciudades-cientificas-y-tecnologicas/' },
  { title: 'Brazo Comercial de Generadores de Conocimiento', href: '/programas/brazo-comercial-de-generadores-de-conocimiento/' },
];

export default function ProgramsDropdown({ programs = defaultPrograms }: ProgramsDropdownProps) {
  return (
    <Dropdown
      label="Programas"
      dismissOnClick={true}
      className="font-medium"
      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
      theme={{
        floating: {
          target: "bg-[#203370] hover:bg-[#2a4289] text-white rounded-lg",
        }
      }}
    >
      <Dropdown.Header>
        <span className="block text-sm">CIHUBS Programs</span>
      </Dropdown.Header>
      {programs.map((program, index) => (
        <Dropdown.Item key={index} href={program.href}>
          {program.title}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
