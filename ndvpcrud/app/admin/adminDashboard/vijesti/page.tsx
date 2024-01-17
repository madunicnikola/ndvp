"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Download, PlusSquare, Image, FileVideo } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"

const postaviVijest = async ({title, description}: {title: string, description: string}) => {
    const res = fetch("http://localhost:3000/api/vijesti", {method:"POST", body: JSON.stringify({title, description}),
    //@ts-ignore
    "Content-Type": "application/json",
    });
    return (await res).json();
};

const dodajVijest = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [value, setValue] = useState("");

    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current !== null){
            toast.loading("Članak se postavlja... 🙏", {id: "1"});
        await postaviVijest({title: titleRef.current?.value, description: descriptionRef.current?.value});
        toast.success("Uspješno postavljen! 💪", {id: "1"});
        router.push("/admin/adminDashboard");
        }
    };

return (
    <Fragment>
        <Toaster/>
        <div className="container w-full m-auto flex my-4">
            <div className="editor flex flex-col justify-center m-auto">
                <p className="text-2xl text-secondaryColor font-bold p-3 font-sans-montserrat uppercase text-center justify-center">Naše vijesti!✨</p>
                <button onClick={() => setOpen(!open)} className="text-greenButtonDark hover:text-greenButtonLite transition duration-300 ease-in-out">
                    <PlusSquare/>
                </button>
                {open && <div className="addButtons">
                    <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}}/> 
                    <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                        <label htmlFor="image" className="hover:cursor-pointer">
                            <Image/>
                        </label>
                    </button>
                    <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                        <FileVideo/>
                    </button>
                    <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                        <Download/>
                    </button>
                        </div>}
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