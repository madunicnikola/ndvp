"use client";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

type updateParams = {
    title: string;
    description: string;
    id: string;
}
const updateVijest = async (data:updateParams) => {
    const res = fetch(`http://localhost:3000/api/vijesti/${data.id}`, {method:"PUT", body:JSON.stringify({title:data.title, description:data.description}),
    //@ts-ignore
    "Content-Type": "application/json",
    });
    return (await res).json();
};
const izbrisiVijest = async (id: string) => {
    const res = fetch(`http://localhost:3000/api/vijesti/${id}`, {
        method:"DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
    });
    return (await res).json();
};

const getBlogId =async (id:string) => {
    const res = await fetch(`http://localhost:3000/api/vijesti/${id}`);
    const data = await res.json();
    return data.post;
}

const preurediVijest = ({params}:{params: {id: string}}) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(()=>{
        toast.loading("Dohvatamo članak...", {id: "1"});
        getBlogId(params.id).then((data)=>{
            if(titleRef.current && descriptionRef.current){
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
                toast.success("Vijest pronađena!", {id: "1"});
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Članak ne postoji!", {id: "1"});
        });
    },[])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current){
            toast.loading("Članak se postavlja... 🙏", {id: "1"});
            await updateVijest({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                id: params.id,
            })
        toast.success("Uspješno postavljen! 💪", {id: "1"});
        router.push("/");
        }
    };
    const handleDelete = async () => {
        toast.loading("Brišemo članak...", {id: "2"});
        await izbrisiVijest(params.id);
        toast.success("Uspješno obrisano!", {id: "2"});
        router.push("/");
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
                        <div className=" justify-between">
                        <button className="font-semibold px-4 py-2 my-2 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out">Podnesi</button>
                        </div>
                    </form>
                    <button onClick={handleDelete} className="font-semibold mt-3 my-2 px-4 py-2 shadow-xl bg-red text-secondaryColor rounded-lg m-auto uppercase hover:bg-darkRed hover: transition duration-300 ease-in-out">Ukloni</button>
                </div>
            </div>
        </Fragment>
    )
}

export default preurediVijest;