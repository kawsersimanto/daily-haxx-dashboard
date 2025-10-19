/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { FileWithPreview, useFileUpload } from "@/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  CloudUpload,
  ImageIcon,
  Upload,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface UploadImageProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (url: string | null) => void;
  uploadMutation: any; // useUploadSingleImageMutation hook
  deleteMutation: any; // useDeleteImageByUrlMutation hook
  defaultImageUrl?: string;
}

export const UploadImage = ({
  maxSize = 5, // 5MB default
  accept = "image/*",
  className,
  onImageChange,
  uploadMutation,
  deleteMutation,
  defaultImageUrl,
}: UploadImageProps) => {
  const [uploadImage, { isLoading: isUploading, error: uploadError }] =
    uploadMutation;
  const [deleteImage, { isLoading: isDeleting }] = deleteMutation;

  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    defaultImageUrl || null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<FileWithPreview | null>(null);

  // Set default image on mount
  useEffect(() => {
    if (defaultImageUrl) {
      setUploadedImageUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  // Handle file upload when pendingFile changes
  useEffect(() => {
    if (!pendingFile) return;

    const handleUpload = async (file: FileWithPreview) => {
      setImageLoading(true);
      setLocalError(null);
      setCoverImage(file);

      try {
        const formData = new FormData();
        formData.append("file", file.file as File);

        const response = await uploadImage(formData).unwrap();

        // Assuming the response contains the image URL
        const imageUrl = response.data?.imageUrl;

        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
          onImageChange?.(imageUrl);
        } else {
          setLocalError("Upload successful but no URL returned");
        }
      } catch (error: any) {
        console.error("Upload failed:", error);
        setLocalError(
          error?.data?.message || "Upload failed. Please try again."
        );
        setCoverImage(null);
      } finally {
        setImageLoading(false);
        setPendingFile(null);
      }
    };

    handleUpload(pendingFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingFile, uploadImage]);

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize: maxSize * (1024 * 1024),
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setPendingFile(files[0]);
      }
    },
  });

  const removeCoverImage = async () => {
    if (uploadedImageUrl) {
      try {
        await deleteImage(uploadedImageUrl).unwrap();
        setUploadedImageUrl(null);
        setCoverImage(null);
        setLocalError(null);
        onImageChange?.(null);
      } catch (error: any) {
        console.error("Delete failed:", error);
        setLocalError(
          error?.data?.message || "Failed to delete image. Please try again."
        );
      }
    } else {
      // If no uploaded URL, just clear local state
      setCoverImage(null);
      setLocalError(null);
      onImageChange?.(null);
    }
  };

  const retryUpload = () => {
    if (coverImage) {
      setPendingFile(coverImage);
    }
  };

  const hasImage = uploadedImageUrl || (coverImage && coverImage.preview);
  const displayImageUrl = uploadedImageUrl || coverImage?.preview;
  const errorMessage = localError || (uploadError as any)?.data?.message;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Cover Upload Area */}
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl transition-all duration-200 border border-border",
          isDragging
            ? "border-dashed border-primary bg-primary/5"
            : hasImage
            ? "border-border bg-background hover:border-primary/50"
            : "border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative aspect-[21/9] w-full">
              {/* Loading placeholder */}
              {(imageLoading || isUploading) && (
                <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="relative">
                      <svg
                        className="size-16 -rotate-90 animate-spin"
                        viewBox="0 0 64 64"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-muted-foreground/20"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * 0.75}`}
                          className="text-primary"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">Uploading...</span>
                  </div>
                </div>
              )}

              {/* Actual image */}
              {displayImageUrl && (
                <Image
                  width={1200}
                  height={1200}
                  src={displayImageUrl}
                  alt="Cover"
                  className={cn(
                    "h-full w-full object-cover transition-opacity duration-300",
                    imageLoading || isUploading ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setLocalError("Failed to load image");
                  }}
                />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              {!isUploading && !isDeleting && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-20">
                  <div className="flex gap-2">
                    <Button
                      onClick={openFileDialog}
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Upload />
                      Change Cover
                    </Button>
                    <Button
                      onClick={removeCoverImage}
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                    >
                      <XIcon />
                      {isDeleting ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="rounded-full bg-primary/10 p-4">
              <CloudUpload className="size-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {maxSize}MB
              </p>
            </div>

            <Button variant="outline" size="sm">
              <ImageIcon />
              Browse Files
            </Button>
          </div>
        )}
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Upload/Delete Error */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{errorMessage}</p>
            {localError && (
              <Button
                onClick={retryUpload}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Retry Upload
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
