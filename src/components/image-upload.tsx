"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import ProgressBar from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {useSession} from "next-auth/react";
interface FileUploadProgress {
  progress: number;
  File?: File;
  fileName: string;
  source: CancelTokenSource | null;
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-black",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function ImageUpload({token, files}: any) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  useEffect(() => {
    axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}rest/get_uploads/`,
        {
          headers:{
            "Authorization":`Bearer ${token.access_token}`
          },
        }
    ).then((response)=>{
      let progress: FileUploadProgress[] = response.data.map((value: string): FileUploadProgress=>{
        return {
          progress: 100,
          fileName: value,
          source: null,
        }
      });
      console.log(progress);
      setFilesToUpload(progress);
    });
  }, []);


  const getFileIconAndColor = (file: File | undefined) => {
    return {
      icon: <FontAwesomeIcon icon={faVideo}/>,
      color: VideoColor.bgColor,
    };
  };

  // feel free to mode all these functions to separate utils
  // here is just for simplicity
  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    if (progress === 100) {
      // setUploadedFiles((prevUploadedFiles) => {
      //   return [...prevUploadedFiles, file];
      // });
      //
      // setFilesToUpload((prevUploadProgress) => {
      //   return prevUploadProgress.filter((item) => item.File !== file);
      // });
      //
      // return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File?.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };

  const uploadImageToCloudinary = async (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource
  ) => {

    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}rest/upload/`,
      formData,
      {
        headers:{
          "Authorization":`Bearer ${token.access_token}`
        },
        onUploadProgress,
        cancelToken: cancelSource.token,
      }
    );
  };

  const removeFile = (file: string) => {

    axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}rest/delete_video/`,
        {
          headers:{
            "Authorization":`Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
          data: {
            "name" : file
          }
        },
    )

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.fileName !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item.name !== file);
    });
  };
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      acceptedFiles = acceptedFiles.slice(0, 4-prevUploadProgress.length).filter((file)=>{
        for (let file1 of prevUploadProgress){
          if(file1.File?.name === file.name)return false;
        }
        return true;
      });
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {

          return {
            progress: 0,
            File: file,
            fileName: file.name,
            source: null,
          };
        }),
      ];
    });

    // cloudinary upload
    const fileUploadBatch = acceptedFiles.map((file) => {
      console.log("FILE UPLOAD");
      const formData = new FormData();
      formData.append("video_file", file);

      const cancelSource = axios.CancelToken.source();
      return uploadImageToCloudinary(
        formData,
        (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
        cancelSource
      );
    });

    try {
      await Promise.all(fileUploadBatch);

    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  }, []);



  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (

      <div className="w-full h-full flex flex-col justify-center ">
        <div className="w-full h-[50%]">
          <label
              {...getRootProps()}
              className="transition relative flex flex-col items-center justify-center w-full h-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-950 hover:bg-card_background p-5  "
          >
            <div className=" text-center">
              <div className=" border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud size={50}/>
              </div>

              <p className="mt-2 text-xl">
                <span className="">Drag files</span>
              </p>
              <p className="text-sm ">
                Click to upload files &#40;files should be under 10 MB &#41;
              </p>
            </div>
          </label>
              <Input
                  {...getInputProps()}
                  id="dropzone-file"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="hidden"
              />

        </div>

        <p className="  text-lg">
          Files to upload
        </p>

        <div className="h-1/2 w-full  border-2 border-dashed rounded-lg p-4  flex flex-col gap-2">
          {filesToUpload.map((fileUploadProgress) => {
            return (
                <div
                    key={fileUploadProgress.fileName}
                    className="h-[25%] w-full flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                >
                  <div className="flex flex-1 items-center  p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress.File).icon}
                    </div>

                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className=" ">
                          {fileUploadProgress.fileName.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                            {fileUploadProgress.progress}%
                          </span>
                      </div>
                      <ProgressBar
                          progress={fileUploadProgress.progress}
                          className={
                            getFileIconAndColor(fileUploadProgress.File).color
                          }
                      />
                    </div>
                  </div>
                  <button
                      onClick={() => {
                        if (fileUploadProgress.source)
                          fileUploadProgress.source.cancel("Upload cancelled");
                        removeFile(fileUploadProgress.fileName);
                      }}
                      className=" text-white bg-red-500 transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex "
                  >
                    <X size={20}/>
                  </button>
                </div>
            );
          })}
        </div>


        {/*{uploadedFiles.length > 0 && (*/}
        {/*    <div>*/}
        {/*      <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">*/}
        {/*        Uploaded Files*/}
        {/*      </p>*/}
        {/*      <div className="space-y-2 pr-3">*/}
        {/*        {uploadedFiles.map((file) => {*/}
        {/*          return (*/}
        {/*              <div*/}
        {/*                  key={file.lastModified}*/}
        {/*                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"*/}
        {/*              >*/}
        {/*                <div className="flex items-center flex-1 p-2">*/}
        {/*                  <div className="text-white">*/}
        {/*                    {getFileIconAndColor(file).icon}*/}
        {/*                  </div>*/}
        {/*                  <div className="w-full ml-2 space-y-1">*/}
        {/*                    <div className="text-sm flex justify-between">*/}
        {/*                      <p className="text-muted-foreground ">*/}
        {/*                        {file.name.slice(0, 25)}*/}
        {/*                      </p>*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*                <button*/}
        {/*                    onClick={() => removeFile(file)}*/}
        {/*                    className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"*/}
        {/*                >*/}
        {/*                  <X size={20}/>*/}
        {/*                </button>*/}
        {/*              </div>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*)}*/}
      </div>
  );
}
