"use client";
import Image from "next/image";
import Link from "next/link";
import React, {useRef} from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

async function pokupiVijesti(){
  const res = await fetch("http://localhost:3000/api/vijesti", {
    next: {
      revalidate: 10,
  },
});
  const data = await res.json();
  return data.posts;
}

export default async function Blog() {
  const router = useRouter();
  const posts = await pokupiVijesti();
  console.log(posts);

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg drop-shadow-xl"> 
        <h1 className="text-center text-5xl font-sans-montserrat uppercase text-secondaryColor"> Novosti </h1>
      </div>
      <div className="blog w-full flex justify-center items-center">
        {posts && posts.map((post: any) => (
          <article key={post.id} className="mainCard">
            <div className="image">
              {post.img && (
                <Image src={post.img} alt={post.title} width={300} height={300} className="Image" priority={true}/>
              )}
            </div>
            <div className="content">
              <h2 className="mainTitle font-bold">
                {post.title}
              </h2>
              <p className="mainDescription">
                {post.description}
              </p>
            </div>
            <p className="datetime">
                {new Date(post.date).toDateString()}
              </p>
            <Link href={`/vijesti/${post.id}`}>
              <Button className="cursor-pointer text-secondaryColor py-2 px-4 rounded-md uppercase hover:bg-grayHover transition duration-300 ease-in-out">
                  Otvori
              </Button>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}