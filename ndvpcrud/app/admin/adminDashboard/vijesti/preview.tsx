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
      <div className="navbar flex justify-between items-center">
      <Image src="/images/scene2/scene2_2.png" alt="" width={150} height={150} objectFit='cover' className="hover: cursor-pointer"/>
      <ul className="previewLinks flex uppercase">
        <li>
          <Link href="#" className="a text-secondaryColor font-md font-sans-montserrat">O nama</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-md font-sans-montserrat">Projekti</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-md font-sans-montserrat">Kolumna</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-md font-sans-montserrat">Vijesti</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-md font-sans-montserrat">Sponzori</Link>
        </li>
      </ul>
      </div>
        <h2 className="text-xl font-semibold text-secondaryColor">{title}</h2>
        <p className="text-secondaryColor">{description}</p>
    </div>
  );
};

export default PreviewComponent;