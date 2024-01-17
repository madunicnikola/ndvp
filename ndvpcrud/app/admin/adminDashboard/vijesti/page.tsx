"use client";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Download, PlusSquare, Image, FileVideo, X } from "lucide-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";
import PreviewComponent from "./preview";

const postaviVijest = async ({ title, description, file }: { title: string; description: string; file: string }) => {
  const res = await fetch("http://localhost:3000/api/vijesti", {
    method: "POST",
    body: JSON.stringify({ title, description, img: file }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const storage = getStorage(app);

const DodajVijest = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewDescription, setPreviewDescription] = useState("");

  const handleCloseImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const handlePreview = () => {
    setPreviewTitle(titleRef.current?.value || "");
    setPreviewDescription(descriptionRef.current?.value || "");
    setShowPreview(true);
    console.log("Preview opened");
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    console.log("Preview closed");
  };

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (file != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);

      const upload = async () => {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Postavljanje je " + progress + "% završeno");
            switch (snapshot.state) {
              case "paused":
                console.log("Postavljanje privremeno pauzirano");
                break;
              case "running":
                console.log("Postavljanje u tijeku...");
                break;
            }
          },
          (error) => {
            console.log("Error s kojim se suočavaš: ", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
            });
          }
        );
      };

      file && upload();
    } else {
      console.log("Nijedna datoteka nije odabrana!");
      setImagePreview(null);
    }
  }, [file]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current && file) {
      toast.loading("Članak se postavlja... 🙏", { id: "1" });
      await postaviVijest({ title: titleRef.current?.value, description: descriptionRef.current?.value, file: media });
      toast.success("Uspješno postavljen! 💪", { id: "1" });
      router.push("/admin/adminDashboard");
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="container w-full m-auto flex my-4">
        <div className="editor flex flex-col justify-center m-auto">
          <p className="text-2xl text-secondaryColor font-bold p-3 font-sans-montserrat uppercase text-center justify-center">Naše vijesti!✨</p>
          <button onClick={() => setOpen(!open)} className="text-greenButtonDark hover:text-greenButtonLite transition duration-300 ease-in-out">
            <PlusSquare />
          </button>
          {open && (
            <div className="addButtons">
              <input type="file" id="image" onChange={(e) => (e.target.files && e.target.files[0] ? setFile(e.target.files[0]) : console.log("No file selected"))} multiple style={{ display: "none" }} />
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <label htmlFor="image" className="hover:cursor-pointer">
                  <Image />
                </label>
              </button>
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <FileVideo />
              </button>
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <Download />
              </button>
            </div>
          )}
          {imagePreview && (
            <div>
              <div className="relative inline-block">
                <img src={imagePreview} alt="Odabrana slika je: " style={{ maxWidth: "20%" }} />
                <button onClick={handleCloseImage}>
                  <X className="absolute top-0 right-15 text-grey" />
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input ref={titleRef} type="text" className="rounded-md px-4 py-2 my-2 w-full" placeholder="naslov" />
            <textarea ref={descriptionRef} className="rounded-md px-4 py-2 w-full my-2" placeholder="sadržaj"></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out">Podnesi</button>
          </form>
          <button type="button" className="font-semibold px-4 py-2 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out" onClick={handlePreview}>
              Pregledaj
            </button>
        </div>
      </div>
      {showPreview && (
        <div className="previewWindow">
          <div className="previewContent">
            <h2 className="previewText text-xl font-semibold text-secondaryColor">Preview:</h2>
            <PreviewComponent title={previewTitle} description={previewDescription}/>
            <button className="closePreview text-grey" onClick={handleClosePreview}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DodajVijest;
