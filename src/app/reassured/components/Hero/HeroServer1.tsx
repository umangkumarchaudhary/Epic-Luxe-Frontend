// components/HeroServer.tsx
import HeroClient from "./HeroClient1"; // Client slider

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  position?: number;
  cta1_text?: string;
  cta1_url_or_action?: string;
  cta2_text?: string;
  cta2_url_or_action?: string;
  image_url: string; // PC image (required)
  mobile_image_url?: string; // Mobile image (optional)
}

async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`https://raam-group-all-websites.onrender.com/admin/reassured-banners`, {
      cache: "no-store", // Always get latest banners
    });
    if (!res.ok) throw new Error("Failed to fetch banners");
    const data = await res.json();
    return data.banners || [];
  } catch (err) {
    console.error("Error fetching banners:", err);
    return [];
  }
}

export default async function HeroServer() {
  const banners = await getBanners();

  if (!banners.length) {
    return (
      <section
        className="bg-white text-black flex items-center justify-center font-manrope"
        style={{ height: "50vh", marginTop: "70px" }}
      >
        <h2 className="text-xl font-bold">No banners available</h2>
      </section>
    );
  }

  return <HeroClient banners={banners} />;
}
