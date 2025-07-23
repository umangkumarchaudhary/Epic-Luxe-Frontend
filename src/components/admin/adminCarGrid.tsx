'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import supabase from "@/lib/supabaseClient";

type ImagePreview = {
  file: File;
  url: string;
};

const AdminCardGrid: React.FC = () => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [form, setForm] = useState({
    title: "",
    short_description: "",
    price: "",
    mileage: "",
    manufactured_year: "",
    make: "",
    model: "",
    variant: "",
    year: "",
    fuel_type: "",
    engine_capacity: "",
    transmission: "",
    drivetrain: "",
    seating_capacity: "",
    horsepower: "",
    torque: "",
    condition: "",
    original_price: "",
    ownership: "",
    video_url: "",
    exterior_color: "",
    interior_color: "",
    is_featured: false,
  });

  // Clean up created object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach(img => {
        URL.revokeObjectURL(img.url);
      });
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 15);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews);
    setMainImageIndex(0); // First is main by default
  };

  const handleMainImageChange = (index: number) => {
    setMainImageIndex(index);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && "checked" in e.target
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      const uploadedUrls: string[] = [];

      for (const image of images) {
        const filename = `car-${Date.now()}-${image.file.name}`;
        const { error } = await supabase.storage.from("cars").upload(filename, image.file);

        if (error) throw error;

        const { data } = supabase.storage.from("cars").getPublicUrl(filename);
        uploadedUrls.push(data.publicUrl);
      }

      const reorderedUrls = [
        uploadedUrls[mainImageIndex],
        ...uploadedUrls.filter((_, i) => i !== mainImageIndex),
      ];

      await axios.post("/admin/stocks", {
        ...form,
        image_urls: reorderedUrls,
      });

      alert("Car uploaded successfully!");
      setImages([]);
      setForm({
        title: "",
        short_description: "",
        price: "",
        mileage: "",
        manufactured_year: "",
        make: "",
        model: "",
        variant: "",
        year: "",
        fuel_type: "",
        engine_capacity: "",
        transmission: "",
        drivetrain: "",
        seating_capacity: "",
        horsepower: "",
        torque: "",
        condition: "",
        original_price: "",
        ownership: "",
        video_url: "",
        exterior_color: "",
        interior_color: "",
        is_featured: false,
      });
    } catch (err) {
      console.error("Upload error:", err);
      if (axios.isAxiosError(err) && err.response) {
        console.log("Error response data:", err.response.data);
        console.log("Error response status:", err.response.status);
        console.log("Error response headers:", err.response.headers);
      }
      alert("Upload failed.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Stock</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(form).map(([key, value]) => {
          if (key === "is_featured") {
            return (
              <label key={key} className="flex items-center gap-2 col-span-full">
                <input
                  type="checkbox"
                  name={key}
                  checked={value as boolean}
                  onChange={handleFormChange}
                />
                Featured Car
              </label>
            );
          }

          const isNumberInput =
            ["price", "mileage", "manufactured_year", "year", "seating_capacity", "horsepower", "torque"].includes(
              key,
            );

          return (
            <input
              key={key}
              type={isNumberInput ? "number" : "text"}
              name={key}
              value={value as string}
              onChange={handleFormChange}
              placeholder={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              className="input"
            />
          );
        })}
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Upload Car Images (max 15):
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative border rounded overflow-hidden cursor-pointer ${
                idx === mainImageIndex ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => handleMainImageChange(idx)}
              aria-label={`Select image ${idx + 1} as main`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleMainImageChange(idx);
                }
              }}
            >
              <Image
                src={img.url}
                alt={`Preview image ${idx + 1}`}
                width={300}
                height={150}
                className="object-cover w-full h-32"
                unoptimized // Because img.url is local blob URL, Next.js image optimization breaks
              />
              {idx === mainImageIndex && (
                <span className="absolute top-1 left-1 bg-blue-600 text-white px-1 text-xs rounded">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Upload Car
      </button>
    </div>
  );
};

export default AdminCardGrid;
