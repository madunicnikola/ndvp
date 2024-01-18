import Image from "next/image";
import Link from "next/link";
import React from 'react';
import {AppStateProvider} from "../components/maintenance/maintenance.js";
import MaintenanceAlert from "../components/form/MaintenanceAlert.js";

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
  const posts = await pokupiVijesti();
  console.log(posts);

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg drop-shadow-xl"> 
      <h1 className="text-center text-5xl font-sans-montserrat uppercase text-secondaryColor"> Novosti </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {posts && posts.map((post: any) => (
          <div key={post.id} className="w-3/4 p-4 rounded-md mx-3 my-2 bg-blogBgColor flex flex-col justify-center">
            <div className="flex items-center my-3">
            <div className="mr-auto my-1">
              {post.img && (
                <Image src={post.img} alt={post.title} width={300} height={300} objectFit="contain"/>
              )}
            </div>
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold font-sans-montserrat text-secondaryColor">{post.title}</h2>
              </div>
            </div>
            <div className="mr-auto my-1">
              <blockquote className="font-extralight text-grey font-sans-montserrat">{new Date(post.date).toDateString()}</blockquote>
            </div>
            <div className="mr-auto my-1">
              <h2 className="font-regular text-secondaryColor font-sans-montserrat normal-case">{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}