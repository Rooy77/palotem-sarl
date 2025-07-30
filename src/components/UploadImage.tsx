// src/components/UploadImage.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

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
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Upload Image
            </button>
          )
        )}
      </CldUploadWidget>

      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="mt-4 w-48 h-auto rounded shadow"
        />
      )}
    </div>
  );
}
