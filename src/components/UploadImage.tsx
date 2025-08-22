"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CloudUpload } from "lucide-react";

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
    <div className="mt-4">
      <CldUploadWidget
        uploadPreset="palotem_unsigned"
        options={{
          sources: ["local"],
          maxFiles: 1,
          resourceType: "image",
          cropping: true,
          croppingAspectRatio: 16 / 9,
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
        {({ open }) =>
          !image && (
            <span
              onClick={() => open()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  open();
                }
              }}
            >
              <CloudUpload className="inline mr-2 mb-1" />
              Upload Image
            </span>
          )
        }
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
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
