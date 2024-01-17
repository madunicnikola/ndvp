import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PreviewProps {
  title: string;
  description: string;
}

const PreviewComponent: React.FC<PreviewProps> = ({ title, description }) => {
  return (
    <div className="article-preview bg-backgroundColor">
      <div className="navbar">
      <Image src="/images/scene2/scene2_2.png" alt="" width={300} height={300} objectFit='cover'/>
      <ul>
        <li>
          <Link href="#" className="text-secondaryColor font-md font-sans-montserrat">O nama</Link>
        </li>
        <li>
          <Link href="#" className="text-secondaryColor font-md font-sans-montserrat">Projekti</Link>
        </li>
        <li>
          <Link href="#" className="text-secondaryColor font-md font-sans-montserrat">Kolumna</Link>
        </li>
        <li>
          <Link href="#" className="text-secondaryColor font-md font-sans-montserrat">Vijesti</Link>
        </li>
        <li>
          <Link href="#" className="text-secondaryColor font-md font-sans-montserrat">Sponzori</Link>
        </li>
      </ul>
      </div>
        <h2 className="text-xl font-semibold text-secondaryColor">{title}</h2>
        <p className="text-secondaryColor">{description}</p>
    </div>
  );
};

export default PreviewComponent;