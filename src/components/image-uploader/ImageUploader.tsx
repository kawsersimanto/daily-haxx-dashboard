/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, User, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string;
  onChange?: (value: string | null) => void;
  onUploadComplete?: (url: string) => void;
  onUploadStart?: (file: File) => void;
  disabled?: boolean;
  maxSize?: number; // in bytes, default 5MB
  uploadMutation?: any; // RTK Query mutation hook result [trigger, { isLoading, error }]
  formKey?: string; // Form data key, default 'file'
}

export const ImageUploader = ({
  value,
  onChange,
  onUploadComplete,
  onUploadStart,
  disabled = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  uploadMutation,
  formKey = "file",
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract RTK Query mutation if provided
  const [uploadTrigger, uploadResult] = uploadMutation || [
    null,
    { isLoading: false },
  ];
  const isUploading = uploading || uploadResult?.isLoading;

  useEffect(() => {
    if (value !== preview) {
      setPreview(value || null);
    }
  }, [value, preview]);

  const previewFile = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file",
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.error("File too large", {
        description: `Please upload an image smaller than ${Math.round(
          maxSize / 1024 / 1024
        )}MB`,
      });
      return;
    }

    setUploading(true);

    // Preview the file immediately
    previewFile(file, (result) => {
      setPreview(result);
      onChange?.(result);
    });

    // Notify parent that upload is starting
    onUploadStart?.(file);

    // If RTK Query mutation is provided, use it
    if (uploadTrigger) {
      try {
        const formData = new FormData();
        formData.append(formKey, file);

        const result = await uploadTrigger(formData).unwrap();

        toast.success("Image uploaded successfully");

        // Call onUploadComplete with server response
        onUploadComplete?.(result.url || result.data?.url || preview!);
      } catch (error: any) {
        toast.error("Upload failed", {
          description:
            error?.data?.message || "There was an error uploading your image",
        });
        // Reset on upload failure
        setPreview(null);
        onChange?.(null);
      } finally {
        setUploading(false);
      }
    } else {
      // Fallback: just keep the preview without uploading
      setUploading(false);
      toast.success("Image selected");
      onUploadComplete?.(preview!);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className={`
          relative w-36 h-36 border-2 border-dashed rounded-lg
          flex items-center justify-center cursor-pointer
          transition-colors overflow-hidden
          ${
            preview
              ? "border-gray-300"
              : "border-gray-400 hover:border-gray-500"
          }
          ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              height={400}
              width={400}
            />
            {!isUploading && !disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <User className="w-16 h-16" />
            <Upload className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
