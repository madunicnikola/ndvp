import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

async function pokupiVijesti(){
    const res = await fetch("http://localhost:3000/api/vijesti", {
      next: {
        revalidate: 10,
    },
  });
    const data = await res.json();
    return data.posts;
  }
  
export default async function BlogPost(){
      const posts = await pokupiVijesti();
  return (
    <div>
    <div className="navbar flex justify-between items-center">
      <Image src="/images/scene2/scene2_2.png" alt="" width={100} height={100} objectFit='cover' className="Image hover: cursor-pointer"/>
      <ul className="previewLinks flex uppercase">
        <li>
          <Link href="#" className="a text-secondaryColor font-sans-montserrat">O nama</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-sans-montserrat">Projekti</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-sans-montserrat">Kolumna</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-sans-montserrat">Vijesti</Link>
        </li>
        <li>
          <Link href="#" className="a text-secondaryColor font-sans-montserrat">Sponzori</Link>
        </li>
      </ul>
      </div>
      {posts.map((post: any) => (
      <div key={post.id}>
            <section className='mainHeader'>
                <div className='headerContentSection'>
                    <div className="headerContent">
                        <h1 className='headerTitle text-secondaryColor'>{post.title}</h1>
                        <p className='headerDesc text-secondaryColor'>{post.description}</p>
                    </div>
                </div>
                {post.img && (
                <div className="headerImageSection" style={{backgroundImage: `url(${post.img})`}}>
                </div>
                  )}
            </section>
            <section className='mainSection'>
                <div>
                  <p>{post.content}</p>
                </div>
            </section>
      </div>
    ))}
    </div>
  )
};