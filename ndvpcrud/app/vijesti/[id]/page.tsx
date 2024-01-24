import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export async function getStaticProps(){
      const res = await fetch("http://localhost:3000/api/vijesti");
      const data = await res.json();
      const posts = data.posts || [];
  return {
    props: {
      posts,
    }
  }
  }
  
export default function BlogPost({posts}: {posts: any[]}){
  return (
      <div>
      <div className="navbar flex justify-between items-center">
        <Image src="/images/scene2/scene2_2.png" alt="" width={100} height={100} className="Image hover: cursor-pointer" style={{objectFit: "cover"}} priority={true}/>
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
              <div className='mainHeader'>
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
              </div>
              <div className='mainSection'>
                  <div>
                    <p>{post.content}</p>
                  </div>
              </div>
        </div>
      ))}
      </div>
  );
}