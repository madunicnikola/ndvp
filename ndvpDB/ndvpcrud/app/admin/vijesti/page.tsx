"use client";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const postaviVijest = async ({title, description}:{title:string, description:string}) => {
    const res = fetch("http://localhost:3000/api/vijesti", {method:"POST", body:JSON.stringify({title, description}),
    //@ts-ignore
    "Content-Type": "application/json",
    });
    return (await res).json();
};

const dodajVijest = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current){
            toast.loading("Članak se postavlja... 🙏", {id: "1"});
        await postaviVijest({title: titleRef.current?.value, description: descriptionRef.current?.value});
        toast.success("Uspješno postavljen! 💪", {id: "1"});
        router.push("/");
        }
    };
    return (
        <Fragment>
            <Toaster/>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center m-auto">
                    <p className="text-2xl text-secondaryColor font-bold p-3 font-sans-montserrat uppercase text-center justify-center">Naše vijesti!✨</p>
                    <form onSubmit={handleSubmit}>
                        <input ref={titleRef} type="text" className="rounded-md px-4 py-2 my-2 w-full" placeholder="UNESI NASLOV"/>
                        <textarea ref={descriptionRef} className="rounded-md px-4 py-2 w-full my-2" placeholder="UNESI SADRŽAJ"></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out">Podnesi</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default dodajVijest;