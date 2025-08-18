// components/jsonld/VehicleJsonLd.tsx
import React from 'react';

type Props = {
  name: string;                 // e.g. "BMW 320d 2019"
  description?: string;
  image: string | string[];
  brand: string;                // "BMW"
  model: string;                // "320d"
  variant?: string | null;      // "Sport"
  year?: number | null;         // 2019
  mileage?: number | null;      // in KM
  bodyType?: string;            // "Sedan"
  fuelType?: string;            // "Diesel"
  transmission?: string;        // "Automatic"
  url: string;
  price?: number | null;
  priceCurrency?: string;       // "INR"
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  location?: string;            // city
};

export default function VehicleJsonLd(props: Props) {
  const data = {
    '@context': 'https://schema.org/',
    '@type': 'Vehicle',
    name: props.name,
    description: props.description,
    image: Array.isArray(props.image) ? props.image : [props.image],
    brand: { '@type': 'Brand', name: props.brand },
    model: props.model,
    vehicleModelDate: props.year || undefined,
    bodyType: props.bodyType,
    fuelType: props.fuelType,
    vehicleTransmission: props.transmission,
    mileageFromOdometer: props.mileage ? {
      '@type': 'QuantitativeValue',
      value: props.mileage,
      unitCode: 'KMT'
    } : undefined,
    offers: props.price ? {
      '@type': 'Offer',
      priceCurrency: props.priceCurrency || 'INR',
      price: props.price,
      availability: props.availability ? `https://schema.org/${props.availability}` : undefined,
      url: props.url,
    } : undefined,
    url: props.url,
    areaServed: props.location,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
