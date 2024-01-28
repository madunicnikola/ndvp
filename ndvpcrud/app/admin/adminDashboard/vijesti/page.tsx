"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Download, PlusSquare, ImageDown, FileVideo, X } from "lucide-react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";
import PreviewComponent from "./preview";
import Image from "next/image";

const postaviVijest = async ({ title, description, file, content }: { title: string; description: string; file: string, content: string }) => {
  const res = await fetch("http://localhost:3000/api/vijesti", {
    method: "POST",
    body: JSON.stringify({ title, description, img: file, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.id;
};


const storage = getStorage(app);

const DodajVijest = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [previewTitle, setPreviewTitle] = useState("");
  const [previewDescription, setPreviewDescription] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleCloseImage = () => {
    setFile(null);
    setImagePreview(null);
    setMedia(null);
  };
  
  const handleCloseVideoPreview = () => {
    setFile(null);
    setVideoPreview(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);


    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };

    reader.readAsDataURL(selectedFile);
    }
  }
  const handleCloseFile = () => {
    setFile(null);
    setFilePreview(null);
  }
  const handlePreview = () => {
    setPreviewTitle(titleRef.current?.value || "");
    setPreviewDescription(descriptionRef.current?.value || "");
    setPreviewContent(contentRef.current?.value || "");
    setShowPreview(true);
    console.log("Preview opened");
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    console.log("Preview closed");
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedVideo = e.target.files && e.target.files[0];

    if (selectedVideo) {
      setFile(selectedVideo);

    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result as string);
    };

    reader.readAsDataURL(selectedVideo);
  }
};

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (selectedImage){
      setFile(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(selectedImage);
    }
  }

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (file != null) {
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
    }
  }, [file]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current && file && contentRef.current) {
      toast.loading("Članak se postavlja... 🙏", { id: "1" });
      await postaviVijest({ title: titleRef.current?.value, description: descriptionRef.current?.value, file: media || "", content: contentRef.current?.value});
      toast.success("Uspješno postavljen! 💪", { id: "1" });
      router.push("/admin/adminDashboard");
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="container w-full m-auto flex my-4">
        <div className="editor flex flex-col justify-center m-auto">
          <p className="text-2xl text-secondaryColor font-bold p-3 uppercase text-center justify-center">Naše vijesti!✨</p>
          <button onClick={() => setOpen(!open)} className="text-greenButtonDark hover:text-greenButtonLite transition duration-300 ease-in-out">
            <PlusSquare />
          </button>
          {open && (
            <div className="addButtons">
              <input type="file" id="image" accept=".jpg, .jpeg, .png, .svg" onChange={handleImagePreview} multiple style={{display: "none"}}/>
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <label htmlFor="image" className="hover:cursor-pointer">
                  <ImageDown/>
                </label>
              </button>
              <input type="file" id="video" accept=".mp4, .avi, .mov, .mkv" onChange={(e) => handleVideoChange(e)} multiple style={{display: "none"}}/>
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <label htmlFor="video" className="hover:cursor-pointer">
                  <FileVideo />
                </label>
              </button>
              <input type="file" id="file" accept=".docx, .pdf, .txt" onChange={handleFileChange} multiple style={{display: "none"}}/>
              <button className="newButton text-darkRed hover:text-red transition duration-300 ease-in-out">
                <label htmlFor="file" className="hover:cursor-pointer">
                  <Download />
                </label>
              </button>
            </div>
          )}
          {imagePreview !== null && (
            <div>
              <div className="relative inline-block">
                <Image src={imagePreview} alt="Odabrana slika je: " width={200} height={200} className="imagePreview" priority={true}/>
                <button onClick={handleCloseImage}>
                  <X className="absolute top-0 right-15 text-grey" />
                </button>
              </div>
            </div>
          )}
          {videoPreview !== null && (
            <div>
              <div className="relative inline-block">
                <video controls width={200} height={200} className="videoPreview">
                  <source src={videoPreview} type={file?.type || "video/mp4"}/>
                  Vaš pretraživač ne podržava ovu vrstu video materijala.
                </video>
                <button onClick={handleCloseVideoPreview}>
                  <X className="absolute top-0 right-15 text-grey"/>
                </button>
              </div>
            </div>
          )}
          {filePreview && file && (
            <div> 
              <div className="relative inline-block">
                {file.type === "application/pdf" && (
                  <embed src={filePreview} type="application/pdf" width={200} height={200} />
                )}
                {file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                  <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(filePreview)}`} width="200" height="150"></iframe>
                )}
                {file.type === "text/plain" && (
                  <pre>{filePreview}</pre>
                )}
                <button onClick={handleCloseFile}>
                  <X className="absolute top-0 right-15 text-grey"/>
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input ref={titleRef} type="text" className="rounded-md px-4 py-2 my-2 w-full" placeholder="naslov" />
            <input ref={descriptionRef} className="rounded-md px-4 py-2 w-full my-2" placeholder="podnaslov"></input>
            <textarea ref={contentRef} className="rounded-md px-4 py-2 w-full my-2 mt-8 h-[150px]" placeholder="sadržaj"></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out">Podnesi</button>
          </form>
          <button type="button" className="font-semibold px-4 py-2 mb-10 shadow-xl bg-chocolate text-secondaryColor rounded-lg m-auto uppercase hover:bg-buttonColor hover: transition duration-300 ease-in-out" onClick={handlePreview}>
              Pregledaj
            </button>
        </div>
      </div>
      {showPreview && (
        <div className="previewWindow">
          <div className="previewContent">
            <h2 className="previewText text-xl font-semibold text-secondaryColor">Preview:</h2>
            <PreviewComponent title={previewTitle} description={previewDescription} imgFileUrl={imagePreview} videoFileUrl={videoPreview} fileUrl={filePreview} content={previewContent}/>
            <button className="closePreview text-grey uppercase" onClick={handleClosePreview}>
              Zatvori
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DodajVijest;