import Link from "next/link";
import React from 'react';

async function pokupiVijesti(){
  const res = await fetch("http://localhost:3000/api/vijesti", {next: {
    revalidate: 5,
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
      <div className="flex my-3">
        <Link href={"/admin/adminDashboard/vijesti"} className="md:w-36 sm:w-2/4 text-center rounded-md p-2 m-auto text-xl bg-buttonColor font-sans-montserrat uppercase text-secondaryColor">Dodaj Vijest</Link>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {posts && posts.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-blogBgColor flex flex-col justify-center">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold font-sans-montserrat text-secondaryColor">{post.title}</h2>
              </div>
              <Link href={`/admin/adminDashboard/edit/${post.id}`} className="px-4 py-1 bg-buttonColor rounded-md font-sans-montserrat text-center text-xl text-secondaryColor uppercase hover: transition duration-300 ease-in-out">
                Uredi
              </Link>
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