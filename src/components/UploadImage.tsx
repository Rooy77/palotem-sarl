"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  onUpload: (url: string) => void;
  resetTrigger?: boolean;
};

export default function UploadImage({ onUpload, resetTrigger }: Props) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (resetTrigger) {
      setImage(null);
    }
  }, [resetTrigger]);

  return (
    <div className="my-4">
      <CldUploadWidget
        uploadPreset="palotem_unsigned"
        options={{
          sources: ["local"],
          maxFiles: 1,
          resourceType: "image",
          // Configuration recommandée pour Vercel
          cropping: true,
          croppingAspectRatio: 16/9,
          showAdvancedOptions: true,
          multiple: false,
        }}
        onSuccess={(result) => {
          if (
            result &&
            typeof result.info === "object" &&
            result.info !== null &&
            "secure_url" in result.info &&
            typeof result.info.secure_url === "string"
          ) {
            const url = result.info.secure_url;
            setImage(url);
            onUpload(url);
          }
        }}
      >
        {({ open }) => (
          !image && (
            <button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Upload Image
            </button>
          )
        )}
      </CldUploadWidget>

      {image && (
        <div className="mt-4 w-full max-w-xs">
          <Image
            src={image}
            alt="Uploaded content"
            width={400}
            height={225}
            className="rounded shadow object-cover"
            priority={false}
            loading="lazy"
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              onUpload("");
            }}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}