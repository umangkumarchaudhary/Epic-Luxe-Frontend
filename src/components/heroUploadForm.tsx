'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

type Banner = {
  id: string;
  title: string;
  description: string;
  price: string;
  position: string;
  cta_text: string;
  cta_url: string;
  image_url: string;
};

export default function HeroUploadForm() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    position: '',
    cta_text: '',
    cta_url: '',
    image: null as File | null,
  });

  const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/banners');
      setBanners(res.data.banners || []);
    } catch (error) {
      console.error('Fetch banners error:', error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      position: '',
      cta_text: '',
      cta_url: '',
      image: null,
    });
    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cta_text) return alert('CTA Text is required');

    const body = new FormData();
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('price', formData.price);
    body.append('position', formData.position);
    body.append('cta_text', formData.cta_text);
    body.append('cta_url', formData.cta_url);
    if (formData.image) body.append('image', formData.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/admin/update-hero/${editingId}`, body);
        alert('Banner updated');
      } else {
        await axios.post('http://localhost:5000/admin/upload-hero', body);
        alert('Banner uploaded');
      }
      fetchBanners();
      resetForm();
    } catch (error) {
      console.error('Submit banner error:', error);
      alert('Error submitting banner');
    }
  };

  const handleEdit = (banner: Banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      price: banner.price,
      position: banner.position,
      cta_text: banner.cta_text,
      cta_url: banner.cta_url,
      image: null,
    });
    setPreview(banner.image_url);
    setEditingId(banner.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      await axios.delete(`http://localhost:5000/admin/delete-hero/${id}`);
      alert('Banner deleted');
      fetchBanners();
    } catch (error) {
      console.error('Delete banner error:', error);
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit' : 'Upload'} Hero Banner</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="cta_text"
          placeholder="CTA Text"
          value={formData.cta_text}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="cta_url"
          placeholder="CTA URL (optional)"
          value={formData.cta_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} className="block" />
        {preview && (
          <div className="relative w-full max-h-64 rounded shadow overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              width={600}
              height={400}
              objectFit="contain"
              unoptimized // since preview is object URL, optimization is not possible
            />
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            {editingId ? 'Update' : 'Upload'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Existing Hero Banners</h3>
      <div className="grid gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="border p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex gap-4 items-center">
              <div className="relative w-24 h-16 rounded overflow-hidden">
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 150px"
                />
              </div>
              <div>
                <h4 className="font-bold">{banner.title}</h4>
                <p className="text-sm text-gray-600">{banner.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(banner)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
