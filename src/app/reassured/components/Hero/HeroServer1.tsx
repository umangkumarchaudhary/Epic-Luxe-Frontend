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
  image_url: string; // updated to match backend
}

async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
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
