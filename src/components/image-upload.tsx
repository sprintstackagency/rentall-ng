
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  bucketName?: string;
  folderPath?: string;
  singleImage?: boolean;
  className?: string;
  imageClassName?: string;
  variant?: "square" | "avatar" | "banner";
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 5,
  bucketName = "images",
  folderPath = "general",
  singleImage = false,
  className = "",
  imageClassName = "",
  variant = "square",
}: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Create a className based on the variant
  const getContainerClassName = () => {
    switch (variant) {
      case "avatar":
        return "relative rounded-full overflow-hidden";
      case "banner":
        return "relative w-full aspect-[3/1] overflow-hidden";
      default:
        return "relative aspect-square overflow-hidden";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // If single image mode, we replace the current image
    const newImages = singleImage ? [] : [...images];

    // Check if adding these files would exceed the max
    if (!singleImage && newImages.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `You can only upload a maximum of ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    const totalFiles = files.length;
    let completedFiles = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${folderPath}/${fileName}`;

        // Check if the bucket exists, if not create it
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === bucketName);
        
        if (!bucketExists) {
          await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
          });
        }

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        newImages.push(urlData.publicUrl);
      }

      onChange(newImages);
      toast({
        title: "Upload successful",
        description: `Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}`,
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the input value so the same file can be selected again
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const renderPreview = () => {
    if (singleImage) {
      // Single image mode (profile picture, etc.)
      if (images.length > 0) {
        return (
          <div className={`${getContainerClassName()} ${imageClassName}`}>
            <img
              src={images[0]}
              alt="Uploaded image"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(0)}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </button>
          </div>
        );
      } else {
        return (
          <div className={`${getContainerClassName()} ${imageClassName} border-2 border-dashed flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:border-brand transition-colors`}>
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
                <span className="text-xs">{uploadProgress}%</span>
              </div>
            ) : (
              <>
                <Upload className="h-6 w-6" />
                <span className="text-xs">Upload</span>
              </>
            )}
          </div>
        );
      }
    } else {
      // Multiple images mode (listing images, etc.)
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={img}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </button>
            </div>
          ))}

          {images.length < maxImages && (
            <div className="aspect-square">
              <Label
                htmlFor="image-upload"
                className="h-full rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:border-brand transition-colors cursor-pointer"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                    <span className="text-xs">{uploadProgress}%</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Add Image</span>
                  </>
                )}
              </Label>
            </div>
          )}

          {images.length === 0 && (
            <div className="col-span-full text-center p-4 border rounded-md border-dashed">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" />
                <p className="text-sm mb-2">No images uploaded yet</p>
                <p className="text-xs mb-4">Upload up to {maxImages} images</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {!singleImage && <Label>Images</Label>}
      
      {renderPreview()}
      
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className="sr-only"
        multiple={!singleImage}
        disabled={isUploading}
        onChange={handleFileChange}
      />
      
      {!singleImage && (
        <p className="text-sm text-muted-foreground mt-2">
          Upload up to {maxImages} images. Recommended size: 800x600px or larger.
        </p>
      )}
    </div>
  );
}
