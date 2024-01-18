import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PreviewProps {
  title: string;
  description: string;
  imgFileUrl: string | null;
  videoFileUrl: string | null;
  fileUrl: string | null;
}

const PreviewComponent: React.FC<PreviewProps> = ({ title, description, imgFileUrl, videoFileUrl, fileUrl }) => {
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
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          {imgFileUrl && (
              <Image src={imgFileUrl} alt="Vijesti" width={200} height={200} objectFit='cover' className="imagePreviewContainer"/>
          )}
        </div>
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-semibold text-secondaryColor">{title}</h2>
        </div>
      </div>
      {videoFileUrl && (
        <div className="video-preview">
          <video controls width={200} height={200} className="videoPreview">
            <source src={videoFileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {fileUrl && (
        <div>
            <iframe src={fileUrl} width={200} height={200} />
        </div>
      )}
        <p className="text-secondaryColor">{description}</p>
    </div>
  );
};

export default PreviewComponent;