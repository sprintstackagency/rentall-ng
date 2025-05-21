
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  bucketName?: string;
  folderPath?: string;
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 5,
  bucketName = "equipment",
  folderPath = "items",
}: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the max
    if (images.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `You can only upload a maximum of ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [...images];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${folderPath}/${fileName}`;

        // For demo purposes, we'll just use a random unsplash image instead of actually uploading
        // In a real app, you would uncomment this and use the Supabase storage
        
        // const { error: uploadError } = await supabase.storage
        //   .from(bucketName)
        //   .upload(filePath, file);

        // if (uploadError) {
        //   throw uploadError;
        // }

        // const { data } = supabase.storage
        //   .from(bucketName)
        //   .getPublicUrl(filePath);

        // Mock a public URL with unsplash
        const mockPublicUrl = `https://source.unsplash.com/random/800x600?equipment&sig=${Date.now() + i}`;
        newImages.push(mockPublicUrl);
      }

      onChange(newImages);
      toast({
        title: "Images uploaded",
        description: "Your images have been uploaded successfully",
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
      // Reset the input value so the same file can be selected again
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <Label>Images</Label>
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
                <div className="animate-pulse">Uploading...</div>
              ) : (
                <>
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Add Image</span>
                </>
              )}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                multiple
                disabled={isUploading}
                onChange={handleFileChange}
              />
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
      <p className="text-sm text-muted-foreground mt-2">
        Upload up to {maxImages} images. Recommended size: 800x600px or larger.
      </p>
    </div>
  );
}
