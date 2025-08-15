const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/&/g, 'and')          // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-')    // Replace spaces and non-word chars with hyphen
    .replace(/^-+|-+$/g, '');     // Trim leading/trailing hyphens
};

export const vehicleData = [
  {
    id: 1,
    brand: 'Mercedes-Benz',
    model: 'E-Class E220d',
    year: 2021,
    slug: slugify('Mercedes-Benz E-Class E220d 2021'),
    price: '₹45,50,000',
    originalPrice: '₹52,00,000',
    image: '/assets/images/Mercedes.jpg',
    mileage: '25,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 5,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Sunroof', 'Leather Seats', 'Navigation', 'Premium Audio'],
    savings: '₹6,50,000',
    isLiked: false,
    views: 1240,
    conditionHealth: {
      engine: 95,
      tyres: 90,
      paint: 92,
      interior: 93,
      electrical: 94
    },
    featuresDetailed: {
      Safety: ['Navigation'],
      Comfort: ['Leather Seats', 'Sunroof'],
      Technology: ['Navigation', 'Premium Audio'],
      Exterior: ['Sunroof']
    },
    marketPriceData: [
      { month: 'Jan', price: 4500000 },
      { month: 'Feb', price: 4480000 },
      { month: 'Mar', price: 4450000 },
      { month: 'Apr', price: 4470000 },
      { month: 'May', price: 4490000 },
      { month: 'Jun', price: 4550000 }
    ]
  },
  {
    id: 2,
    brand: 'BMW',
    model: '3 Series 320d',
    year: 2020,
    slug: slugify('BMW 3 Series 320d 2020'),
    price: '₹38,75,000',
    originalPrice: '₹45,00,000',
    image: '/assets/images/bmw.jfif',
    mileage: '35,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 5,
    location: 'Delhi, NCR',
    condition: 'Very Good',
    features: ['Sunroof', 'Sport Mode', 'Premium Audio', 'Climate Control'],
    savings: '₹6,25,000',
    isLiked: false,
    views: 890,
    conditionHealth: {
      engine: 91,
      tyres: 85,
      paint: 88,
      interior: 89,
      electrical: 90
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Sunroof', 'Climate Control'],
      Technology: ['Sport Mode', 'Premium Audio'],
      Exterior: ['Sunroof']
    },
    marketPriceData: [
      { month: 'Jan', price: 3875000 },
      { month: 'Feb', price: 3850000 },
      { month: 'Mar', price: 3820000 },
      { month: 'Apr', price: 3800000 },
      { month: 'May', price: 3850000 },
      { month: 'Jun', price: 3870000 }
    ]
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A4 Premium Plus',
    year: 2019,
    slug: slugify('Audi A4 Premium Plus 2019'),
    price: '₹32,90,000',
    originalPrice: '₹38,50,000',
    image: '/assets/images/AudiA4.jpg',
    mileage: '42,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Bangalore, Karnataka',
    condition: 'Good',
    features: ['Virtual Cockpit', 'Matrix LED', 'Quattro AWD', 'Bang & Olufsen'],
    savings: '₹5,60,000',
    isLiked: false,
    views: 756,
    conditionHealth: {
      engine: 88,
      tyres: 83,
      paint: 85,
      interior: 84,
      electrical: 86
    },
    featuresDetailed: {
      Safety: ['Quattro AWD'],
      Comfort: [],
      Technology: ['Virtual Cockpit', 'Bang & Olufsen'],
      Exterior: ['Matrix LED']
    },
    marketPriceData: [
      { month: 'Jan', price: 3290000 },
      { month: 'Feb', price: 3270000 },
      { month: 'Mar', price: 3250000 },
      { month: 'Apr', price: 3220000 },
      { month: 'May', price: 3240000 },
      { month: 'Jun', price: 3290000 }
    ]
  },
  {
    id: 4,
    brand: 'Jaguar',
    model: 'XE Pure',
    year: 2020,
    slug: slugify('Jaguar XE Pure 2020'),
    price: '₹28,50,000',
    originalPrice: '₹35,00,000',
    image: '/assets/images/jaguar.jpg',
    mileage: '28,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Hyderabad, Telangana',
    condition: 'Excellent',
    features: ['Touch Screen', 'Meridian Audio', 'Keyless Entry', 'Cruise Control'],
    savings: '₹6,50,000',
    isLiked: false,
    views: 643,
    conditionHealth: {
      engine: 92,
      tyres: 89,
      paint: 90,
      interior: 91,
      electrical: 92
    },
    featuresDetailed: {
      Safety: ['Cruise Control', 'Keyless Entry'],
      Comfort: ['Meridian Audio'],
      Technology: ['Touch Screen'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 2850000 },
      { month: 'Feb', price: 2820000 },
      { month: 'Mar', price: 2800000 },
      { month: 'Apr', price: 2790000 },
      { month: 'May', price: 2810000 },
      { month: 'Jun', price: 2850000 }
    ]
  },
  {
    id: 5,
    brand: 'Volvo',
    model: 'XC60 T4',
    year: 2021,
    slug: slugify('Volvo XC60 T4 2021'),
    price: '₹42,00,000',
    originalPrice: '₹48,50,000',
    image: '/assets/images/volvoXC60.jpg',
    mileage: '18,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Chennai, Tamil Nadu',
    condition: 'Excellent',
    features: ['Pilot Assist', 'Panoramic Sunroof', 'Harman Kardon', 'Air Suspension'],
    savings: '₹6,50,000',
    isLiked: false,
    views: 1120,
    conditionHealth: {
      engine: 94,
      tyres: 92,
      paint: 93,
      interior: 94,
      electrical: 95
    },
    featuresDetailed: {
      Safety: ['Pilot Assist'],
      Comfort: ['Panoramic Sunroof', 'Air Suspension'],
      Technology: ['Harman Kardon'],
      Exterior: ['Panoramic Sunroof']
    },
    marketPriceData: [
      { month: 'Jan', price: 4200000 },
      { month: 'Feb', price: 4180000 },
      { month: 'Mar', price: 4150000 },
      { month: 'Apr', price: 4170000 },
      { month: 'May', price: 4200000 },
      { month: 'Jun', price: 4220000 }
    ]
  },
  {
    id: 6,
    brand: 'Land Rover',
    model: 'Discovery Sport',
    year: 2020,
    slug: slugify('Land Rover Discovery Sport 2020'),
    price: '₹55,00,000',
    originalPrice: '₹62,50,000',
    image: '/assets/images/LandRover.avif',
    mileage: '22,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 7,
    location: 'Pune, Maharashtra',
    condition: 'Very Good',
    features: ['Terrain Response', '7 Seats', 'Meridian Audio', 'Panoramic Roof'],
    savings: '₹7,50,000',
    isLiked: false,
    views: 987,
    conditionHealth: {
      engine: 90,
      tyres: 87,
      paint: 88,
      interior: 89,
      electrical: 90
    },
    featuresDetailed: {
      Safety: ['Terrain Response'],
      Comfort: ['7 Seats', 'Meridian Audio'],
      Technology: [],
      Exterior: ['Panoramic Roof']
    },
    marketPriceData: [
      { month: 'Jan', price: 5500000 },
      { month: 'Feb', price: 5450000 },
      { month: 'Mar', price: 5400000 },
      { month: 'Apr', price: 5380000 },
      { month: 'May', price: 5420000 },
      { month: 'Jun', price: 5500000 }
    ]
  },
  {
    id: 7,
    brand: 'Mercedes-Benz',
    model: 'C-Class C200',
    year: 2022,
    slug: slugify('Mercedes-Benz C-Class C200 2022'),
    price: '₹41,25,000',
    originalPrice: '₹47,50,000',
    image: '/assets/images/C200.avif',
    mileage: '15,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Gurgaon, Haryana',
    condition: 'Excellent',
    features: ['MBUX Infotainment', 'LED Headlamps', 'Wireless Charging', 'Digital Cluster'],
    savings: '₹6,25,000',
    isLiked: false,
    views: 1456,
    conditionHealth: {
      engine: 96,
      tyres: 92,
      paint: 95,
      interior: 95,
      electrical: 96
    },
    featuresDetailed: {
      Safety: [],
      Comfort: [],
      Technology: ['MBUX Infotainment', 'Wireless Charging', 'Digital Cluster'],
      Exterior: ['LED Headlamps']
    },
    marketPriceData: [
      { month: 'Jan', price: 4125000 },
      { month: 'Feb', price: 4100000 },
      { month: 'Mar', price: 4080000 },
      { month: 'Apr', price: 4090000 },
      { month: 'May', price: 4110000 },
      { month: 'Jun', price: 4120000 }
    ]
  },
  {
    id: 8,
    brand: 'BMW',
    model: 'X1 sDrive20d',
    year: 2021,
    slug: slugify('BMW X1 sDrive20d 2021'),
    price: '₹36,90,000',
    originalPrice: '₹42,50,000',
    image: '/assets/images/BMWX1.jpg',
    mileage: '28,500 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 5,
    location: 'Kolkata, West Bengal',
    condition: 'Very Good',
    features: ['iDrive System', 'Panoramic Sunroof', 'Auto Park', 'Driving Modes'],
    savings: '₹5,60,000',
    isLiked: false,
    views: 892,
    conditionHealth: {
      engine: 91,
      tyres: 87,
      paint: 88,
      interior: 88,
      electrical: 89
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Panoramic Sunroof'],
      Technology: ['iDrive System', 'Auto Park', 'Driving Modes'],
      Exterior: ['Panoramic Sunroof']
    },
    marketPriceData: [
      { month: 'Jan', price: 3690000 },
      { month: 'Feb', price: 3660000 },
      { month: 'Mar', price: 3650000 },
      { month: 'Apr', price: 3640000 },
      { month: 'May', price: 3660000 },
      { month: 'Jun', price: 3690000 }
    ]
  },
  {
    id: 9,
    brand: 'Audi',
    model: 'Q5 Premium',
    year: 2020,
    slug: slugify('Audi Q5 Premium 2020'),
    price: '₹48,75,000',
    originalPrice: '₹56,00,000',
    image: '/assets/images/audiQ5.avif',
    mileage: '32,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Ahmedabad, Gujarat',
    condition: 'Good',
    features: ['Virtual Cockpit Plus', 'Quattro AWD', 'MMI Touch', 'B&O Sound'],
    savings: '₹7,25,000',
    isLiked: false,
    views: 1123,
    conditionHealth: {
      engine: 89,
      tyres: 86,
      paint: 87,
      interior: 85,
      electrical: 87
    },
    featuresDetailed: {
      Safety: ['Quattro AWD'],
      Comfort: [],
      Technology: ['Virtual Cockpit Plus', 'MMI Touch', 'B&O Sound'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 4875000 },
      { month: 'Feb', price: 4850000 },
      { month: 'Mar', price: 4820000 },
      { month: 'Apr', price: 4800000 },
      { month: 'May', price: 4840000 },
      { month: 'Jun', price: 4870000 }
    ]
  },
  {
    id: 10,
    brand: 'Porsche',
    model: 'Macan Base',
    year: 2019,
    slug: slugify('Porsche Macan Base 2019'),
    price: '₹62,50,000',
    originalPrice: '₹72,00,000',
    image: '/assets/images/porscheMacan.avif',
    mileage: '38,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Mumbai, Maharashtra',
    condition: 'Good',
    features: ['Sport Chrono', 'PCM System', 'PASM', 'Sport Exhaust'],
    savings: '₹9,50,000',
    isLiked: false,
    views: 2145,
    conditionHealth: {
      engine: 87,
      tyres: 84,
      paint: 85,
      interior: 83,
      electrical: 85
    },
    featuresDetailed: {
      Safety: [],
      Comfort: [],
      Technology: ['Sport Chrono', 'PASM', 'PCM System'],
      Exterior: ['Sport Exhaust']
    },
    marketPriceData: [
      { month: 'Jan', price: 6250000 },
      { month: 'Feb', price: 6200000 },
      { month: 'Mar', price: 6150000 },
      { month: 'Apr', price: 6130000 },
      { month: 'May', price: 6170000 },
      { month: 'Jun', price: 6250000 }
    ]
  },
  // Add slug properties similarly for IDs 11 to 30...
  {
    id: 11,
    brand: 'Lexus',
    model: 'ES 300h',
    year: 2021,
    slug: slugify('Lexus ES 300h 2021'),
    price: '₹44,90,000',
    originalPrice: '₹51,50,000',
    image: '/assets/images/LexusEs300h.avif',
    mileage: '19,000 km',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seating: 5,
    location: 'Bangalore, Karnataka',
    condition: 'Excellent',
    features: ['Mark Levinson Audio', 'Hybrid System', 'Lexus Safety+', 'Climate Concierge'],
    savings: '₹6,60,000',
    isLiked: false,
    views: 567,
    conditionHealth: {
      engine: 95,
      tyres: 90,
      paint: 92,
      interior: 93,
      electrical: 95
    },
    featuresDetailed: {
      Safety: ['Lexus Safety+'],
      Comfort: ['Climate Concierge'],
      Technology: ['Hybrid System', 'Mark Levinson Audio'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 4490000 },
      { month: 'Feb', price: 4460000 },
      { month: 'Mar', price: 4440000 },
      { month: 'Apr', price: 4430000 },
      { month: 'May', price: 4470000 },
      { month: 'Jun', price: 4490000 }
    ]
  },
  {
    id: 12,
    brand: 'Range Rover',
    model: 'Evoque SE',
    year: 2020,
    slug: slugify('Range Rover Evoque SE 2020'),
    price: '₹52,75,000',
    originalPrice: '₹61,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '26,500 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Delhi, NCR',
    condition: 'Very Good',
    features: ['Touch Pro Duo', 'ClearSight Mirrors', 'Terrain Response 2', 'Meridian Audio'],
    savings: '₹8,25,000',
    isLiked: false,
    views: 1834,
    conditionHealth: {
      engine: 90,
      tyres: 88,
      paint: 89,
      interior: 90,
      electrical: 90
    },
    featuresDetailed: {
      Safety: ['Terrain Response 2'],
      Comfort: ['Meridian Audio'],
      Technology: ['Touch Pro Duo', 'ClearSight Mirrors'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 5275000 },
      { month: 'Feb', price: 5250000 },
      { month: 'Mar', price: 5230000 },
      { month: 'Apr', price: 5210000 },
      { month: 'May', price: 5250000 },
      { month: 'Jun', price: 5270000 }
    ]
  },
  {
    id: 13,
    brand: 'Mercedes-Benz',
    model: 'GLA 200',
    year: 2021,
    slug: slugify('Mercedes-Benz GLA 200 2021'),
    price: '₹39,50,000',
    originalPrice: '₹45,50,000',
    image: '/assets/images/GLA200.avif',
    mileage: '21,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Chennai, Tamil Nadu',
    condition: 'Excellent',
    features: ['MBUX AR Navigation', 'Ambient Lighting', '7-Speed DCT', 'Active Brake Assist'],
    savings: '₹6,00,000',
    isLiked: false,
    views: 945,
    conditionHealth: {
      engine: 94,
      tyres: 91,
      paint: 93,
      interior: 92,
      electrical: 94
    },
    featuresDetailed: {
      Safety: ['Active Brake Assist'],
      Comfort: ['Ambient Lighting'],
      Technology: ['MBUX AR Navigation', '7-Speed DCT'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 3950000 },
      { month: 'Feb', price: 3920000 },
      { month: 'Mar', price: 3900000 },
      { month: 'Apr', price: 3910000 },
      { month: 'May', price: 3930000 },
      { month: 'Jun', price: 3950000 }
    ]
  },
  {
    id: 14,
    brand: 'BMW',
    model: '5 Series 530i',
    year: 2019,
    slug: slugify('BMW 5 Series 530i 2019'),
    price: '₹46,25,000',
    originalPrice: '₹54,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '41,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Pune, Maharashtra',
    condition: 'Good',
    features: ['Gesture Control', 'Wireless Charging', 'Harman Kardon', 'Driving Assistant'],
    savings: '₹7,75,000',
    isLiked: false,
    views: 1267,
    conditionHealth: {
      engine: 87,
      tyres: 82,
      paint: 84,
      interior: 85,
      electrical: 86
    },
    featuresDetailed: {
      Safety: ['Driving Assistant'],
      Comfort: [],
      Technology: ['Gesture Control', 'Wireless Charging', 'Harman Kardon'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 4625000 },
      { month: 'Feb', price: 4600000 },
      { month: 'Mar', price: 4570000 },
      { month: 'Apr', price: 4550000 },
      { month: 'May', price: 4590000 },
      { month: 'Jun', price: 4620000 }
    ]
  },
  {
    id: 15,
    brand: 'Audi',
    model: 'A6 Technology',
    year: 2020,
    slug: slugify('Audi A6 Technology 2020'),
    price: '₹51,90,000',
    originalPrice: '₹59,50,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '29,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Hyderabad, Telangana',
    condition: 'Very Good',
    features: ['Matrix LED', 'Virtual Cockpit', 'quattro AWD', 'MMI Navigation Plus'],
    savings: '₹7,60,000',
    isLiked: false,
    views: 1598,
    conditionHealth: {
      engine: 91,
      tyres: 87,
      paint: 88,
      interior: 89,
      electrical: 90
    },
    featuresDetailed: {
      Safety: ['quattro AWD'],
      Comfort: [],
      Technology: ['Virtual Cockpit', 'MMI Navigation Plus'],
      Exterior: ['Matrix LED']
    },
    marketPriceData: [
      { month: 'Jan', price: 5190000 },
      { month: 'Feb', price: 5170000 },
      { month: 'Mar', price: 5150000 },
      { month: 'Apr', price: 5140000 },
      { month: 'May', price: 5180000 },
      { month: 'Jun', price: 5190000 }
    ]
  },
  {
    id: 16,
    brand: 'Jaguar',
    model: 'F-Pace Prestige',
    year: 2021,
    slug: slugify('Jaguar F-Pace Prestige 2021'),
    price: '₹58,75,000',
    originalPrice: '₹67,50,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '16,500 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 5,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Touch Pro', 'All Wheel Drive', 'Meridian Sound', 'Activity Key'],
    savings: '₹8,75,000',
    isLiked: false,
    views: 2012,
    conditionHealth: {
      engine: 94,
      tyres: 90,
      paint: 92,
      interior: 93,
      electrical: 94
    },
    featuresDetailed: {
      Safety: ['All Wheel Drive'],
      Comfort: ['Meridian Sound', 'Activity Key'],
      Technology: ['Touch Pro'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 5875000 },
      { month: 'Feb', price: 5840000 },
      { month: 'Mar', price: 5820000 },
      { month: 'Apr', price: 5810000 },
      { month: 'May', price: 5850000 },
      { month: 'Jun', price: 5870000 }
    ]
  },
  {
    id: 17,
    brand: 'Volvo',
    model: 'XC90 T6',
    year: 2020,
    slug: slugify('Volvo XC90 T6 2020'),
    price: '₹65,50,000',
    originalPrice: '₹75,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '24,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 7,
    location: 'Bangalore, Karnataka',
    condition: 'Very Good',
    features: ['Pilot Assist', 'Bowers & Wilkins', 'Air Suspension', 'Crystal Gear Knob'],
    savings: '₹9,50,000',
    isLiked: false,
    views: 1876,
    conditionHealth: {
      engine: 90,
      tyres: 88,
      paint: 89,
      interior: 90,
      electrical: 91
    },
    featuresDetailed: {
      Safety: ['Pilot Assist'],
      Comfort: ['Air Suspension'],
      Technology: ['Bowers & Wilkins', 'Crystal Gear Knob'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 6550000 },
      { month: 'Feb', price: 6520000 },
      { month: 'Mar', price: 6500000 },
      { month: 'Apr', price: 6480000 },
      { month: 'May', price: 6530000 },
      { month: 'Jun', price: 6550000 }
    ]
  },
  {
    id: 18,
    brand: 'Maserati',
    model: 'Ghibli',
    year: 2019,
    slug: slugify('Maserati Ghibli 2019'),
    price: '₹72,90,000',
    originalPrice: '₹85,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '31,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Delhi, NCR',
    condition: 'Good',
    features: ['Harman Kardon', 'Skyhook Suspension', 'Sport Mode', 'Leather Interior'],
    savings: '₹12,10,000',
    isLiked: false,
    views: 2234,
    conditionHealth: {
      engine: 86,
      tyres: 83,
      paint: 85,
      interior: 84,
      electrical: 85
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Skyhook Suspension', 'Leather Interior'],
      Technology: ['Sport Mode', 'Harman Kardon'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 7290000 },
      { month: 'Feb', price: 7250000 },
      { month: 'Mar', price: 7200000 },
      { month: 'Apr', price: 7180000 },
      { month: 'May', price: 7230000 },
      { month: 'Jun', price: 7290000 }
    ]
  },
  {
    id: 19,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    slug: slugify('Tesla Model 3 2022'),
    price: '₹48,90,000',
    originalPrice: '₹55,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '12,000 km',
    fuelType: 'Electric',
    transmission: 'Automatic',
    seating: 5,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Autopilot', 'Over-the-Air Updates', '15-inch Display', 'Supercharging'],
    savings: '₹6,10,000',
    isLiked: false,
    views: 3456,
    conditionHealth: {
      engine: 97,
      tyres: 92,
      paint: 94,
      interior: 95,
      electrical: 98
    },
    featuresDetailed: {
      Safety: ['Autopilot'],
      Comfort: [],
      Technology: ['Over-the-Air Updates', '15-inch Display', 'Supercharging'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 4890000 },
      { month: 'Feb', price: 4850000 },
      { month: 'Mar', price: 4820000 },
      { month: 'Apr', price: 4830000 },
      { month: 'May', price: 4870000 },
      { month: 'Jun', price: 4890000 }
    ]
  },
  {
    id: 20,
    brand: 'Mercedes-Benz',
    model: 'S-Class S350d',
    year: 2019,
    slug: slugify('Mercedes-Benz S-Class S350d 2019'),
    price: '₹78,50,000',
    originalPrice: '₹92,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '45,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 5,
    location: 'Chennai, Tamil Nadu',
    condition: 'Good',
    features: ['Magic Body Control', 'Burmester Audio', 'Executive Rear Seats', 'Night Vision'],
    savings: '₹13,50,000',
    isLiked: false,
    views: 1789,
    conditionHealth: {
      engine: 85,
      tyres: 80,
      paint: 82,
      interior: 83,
      electrical: 84
    },
    featuresDetailed: {
      Safety: ['Night Vision'],
      Comfort: ['Executive Rear Seats'],
      Technology: ['Magic Body Control', 'Burmester Audio'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 7850000 },
      { month: 'Feb', price: 7800000 },
      { month: 'Mar', price: 7750000 },
      { month: 'Apr', price: 7730000 },
      { month: 'May', price: 7780000 },
      { month: 'Jun', price: 7850000 }
    ]
  },
  {
    id: 21,
    brand: 'BMW',
    model: 'X5 xDrive30d',
    year: 2020,
    slug: slugify('BMW X5 xDrive30d 2020'),
    price: '₹62,75,000',
    originalPrice: '₹72,50,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '33,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seating: 7,
    location: 'Kolkata, West Bengal',
    condition: 'Very Good',
    features: ['xDrive AWD', 'Panoramic Roof', 'Harman Kardon', 'Gesture Control'],
    savings: '₹9,75,000',
    isLiked: false,
    views: 1654,
    conditionHealth: {
      engine: 90,
      tyres: 87,
      paint: 89,
      interior: 89,
      electrical: 90
    },
    featuresDetailed: {
      Safety: ['xDrive AWD'],
      Comfort: ['Panoramic Roof'],
      Technology: ['Harman Kardon', 'Gesture Control'],
      Exterior: ['Panoramic Roof']
    },
    marketPriceData: [
      { month: 'Jan', price: 6275000 },
      { month: 'Feb', price: 6250000 },
      { month: 'Mar', price: 6220000 },
      { month: 'Apr', price: 6200000 },
      { month: 'May', price: 6250000 },
      { month: 'Jun', price: 6270000 }
    ]
  },
  {
    id: 22,
    brand: 'Audi',
    model: 'Q7 Premium Plus',
    year: 2021,
    slug: slugify('Audi Q7 Premium Plus 2021'),
    price: '₹68,90,000',
    originalPrice: '₹79,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '18,500 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 7,
    location: 'Gurgaon, Haryana',
    condition: 'Excellent',
    features: ['Virtual Cockpit Pro', 'quattro AWD', 'B&O 3D Sound', 'Matrix LED'],
    savings: '₹10,10,000',
    isLiked: false,
    views: 2187,
    conditionHealth: {
      engine: 94,
      tyres: 90,
      paint: 92,
      interior: 93,
      electrical: 94
    },
    featuresDetailed: {
      Safety: ['quattro AWD'],
      Comfort: [],
      Technology: ['Virtual Cockpit Pro', 'B&O 3D Sound'],
      Exterior: ['Matrix LED']
    },
    marketPriceData: [
      { month: 'Jan', price: 6890000 },
      { month: 'Feb', price: 6850000 },
      { month: 'Mar', price: 6820000 },
      { month: 'Apr', price: 6800000 },
      { month: 'May', price: 6870000 },
      { month: 'Jun', price: 6890000 }
    ]
  },
  {
    id: 23,
    brand: 'Bentley',
    model: 'Bentayga V8',
    year: 2020,
    slug: slugify('Bentley Bentayga V8 2020'),
    price: '₹2,85,00,000',
    originalPrice: '₹3,25,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '8,500 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Naim Audio', 'Mulliner Trim', 'All-Terrain Modes', 'Massaging Seats'],
    savings: '₹40,00,000',
    isLiked: false,
    views: 4567,
    conditionHealth: {
      engine: 96,
      tyres: 94,
      paint: 95,
      interior: 96,
      electrical: 95
    },
    featuresDetailed: {
      Safety: ['All-Terrain Modes'],
      Comfort: ['Massaging Seats'],
      Technology: ['Naim Audio', 'Mulliner Trim'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 28500000 },
      { month: 'Feb', price: 28300000 },
      { month: 'Mar', price: 28200000 },
      { month: 'Apr', price: 28100000 },
      { month: 'May', price: 28400000 },
      { month: 'Jun', price: 28500000 }
    ]
  },
  {
    id: 24,
    brand: 'Rolls-Royce',
    model: 'Ghost',
    year: 2019,
    slug: slugify('Rolls-Royce Ghost 2019'),
    price: '₹3,75,00,000',
    originalPrice: '₹4,50,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '12,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 5,
    location: 'Delhi, NCR',
    condition: 'Excellent',
    features: ['Starlight Headliner', 'Spirit of Ecstasy', 'Bespoke Audio', 'Magic Carpet Ride'],
    savings: '₹75,00,000',
    isLiked: false,
    views: 5432,
    conditionHealth: {
      engine: 97,
      tyres: 95,
      paint: 96,
      interior: 97,
      electrical: 96
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Magic Carpet Ride'],
      Technology: ['Bespoke Audio', 'Starlight Headliner'],
      Exterior: ['Spirit of Ecstasy']
    },
    marketPriceData: [
      { month: 'Jan', price: 37500000 },
      { month: 'Feb', price: 37300000 },
      { month: 'Mar', price: 37100000 },
      { month: 'Apr', price: 37000000 },
      { month: 'May', price: 37400000 },
      { month: 'Jun', price: 37500000 }
    ]
  },
  {
    id: 25,
    brand: 'Lamborghini',
    model: 'Huracan EVO',
    year: 2021,
    slug: slugify('Lamborghini Huracan EVO 2021'),
    price: '₹2,95,00,000',
    originalPrice: '₹3,35,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '3,200 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 2,
    location: 'Bangalore, Karnataka',
    condition: 'Excellent',
    features: ['LDVI System', 'Carbon Fiber', 'Sport Exhaust', 'Performance Trac'],
    savings: '₹40,00,000',
    isLiked: false,
    views: 6789,
    conditionHealth: {
      engine: 98,
      tyres: 95,
      paint: 96,
      interior: 94,
      electrical: 95
    },
    featuresDetailed: {
      Safety: ['LDVI System', 'Performance Trac'],
      Comfort: [],
      Technology: [],
      Exterior: ['Carbon Fiber', 'Sport Exhaust']
    },
    marketPriceData: [
      { month: 'Jan', price: 29500000 },
      { month: 'Feb', price: 29300000 },
      { month: 'Mar', price: 29100000 },
      { month: 'Apr', price: 29000000 },
      { month: 'May', price: 29400000 },
      { month: 'Jun', price: 29500000 }
    ]
  },
  {
    id: 26,
    brand: 'Ferrari',
    model: 'Portofino',
    year: 2020,
    slug: slugify('Ferrari Portofino 2020'),
    price: '₹3,25,00,000',
    originalPrice: '₹3,70,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '2,800 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 4,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Retractable Hardtop', 'JBL Audio', 'Manettino Dial', 'Side Slip Control'],
    savings: '₹45,00,000',
    isLiked: false,
    views: 7234,
    conditionHealth: {
      engine: 97,
      tyres: 96,
      paint: 97,
      interior: 95,
      electrical: 96
    },
    featuresDetailed: {
      Safety: ['Side Slip Control'],
      Comfort: ['Retractable Hardtop'],
      Technology: ['JBL Audio', 'Manettino Dial'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 32500000 },
      { month: 'Feb', price: 32200000 },
      { month: 'Mar', price: 32000000 },
      { month: 'Apr', price: 31900000 },
      { month: 'May', price: 32300000 },
      { month: 'Jun', price: 32500000 }
    ]
  },
  {
    id: 27,
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2021,
    slug: slugify('Porsche 911 Carrera 2021'),
    price: '₹1,85,00,000',
    originalPrice: '₹2,05,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '5,500 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 4,
    location: 'Chennai, Tamil Nadu',
    condition: 'Excellent',
    features: ['Sport Chrono', 'PASM', 'Bose Audio', 'Sports Exhaust'],
    savings: '₹20,00,000',
    isLiked: false,
    views: 3456,
    conditionHealth: {
      engine: 95,
      tyres: 92,
      paint: 94,
      interior: 93,
      electrical: 94
    },
    featuresDetailed: {
      Safety: [],
      Comfort: [],
      Technology: ['Sport Chrono', 'PASM', 'Bose Audio'],
      Exterior: ['Sports Exhaust']
    },
    marketPriceData: [
      { month: 'Jan', price: 18500000 },
      { month: 'Feb', price: 18200000 },
      { month: 'Mar', price: 18000000 },
      { month: 'Apr', price: 17900000 },
      { month: 'May', price: 18300000 },
      { month: 'Jun', price: 18500000 }
    ]
  },
  {
    id: 28,
    brand: 'McLaren',
    model: '720S',
    year: 2020,
    slug: slugify('McLaren 720S 2020'),
    price: '₹3,85,00,000',
    originalPrice: '₹4,25,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '1,200 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 2,
    location: 'Hyderabad, Telangana',
    condition: 'Excellent',
    features: ['Active Aerodynamics', 'Carbon Fiber Monocoque', 'Track Mode', 'Bowers & Wilkins'],
    savings: '₹40,00,000',
    isLiked: false,
    views: 8901,
    conditionHealth: {
      engine: 98,
      tyres: 97,
      paint: 97,
      interior: 96,
      electrical: 97
    },
    featuresDetailed: {
      Safety: [],
      Comfort: [],
      Technology: ['Active Aerodynamics', 'Track Mode', 'Bowers & Wilkins'],
      Exterior: ['Carbon Fiber Monocoque']
    },
    marketPriceData: [
      { month: 'Jan', price: 38500000 },
      { month: 'Feb', price: 38200000 },
      { month: 'Mar', price: 38000000 },
      { month: 'Apr', price: 37900000 },
      { month: 'May', price: 38400000 },
      { month: 'Jun', price: 38500000 }
    ]
  },
  {
    id: 29,
    brand: 'Aston Martin',
    model: 'DB11',
    year: 2019,
    slug: slugify('Aston Martin DB11 2019'),
    price: '₹2,75,00,000',
    originalPrice: '₹3,15,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '6,800 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 4,
    location: 'Pune, Maharashtra',
    condition: 'Very Good',
    features: ['Bang & Olufsen', 'Carbon Fiber', 'Sport Plus Mode', 'Quilted Leather'],
    savings: '₹40,00,000',
    isLiked: false,
    views: 2876,
    conditionHealth: {
      engine: 90,
      tyres: 88,
      paint: 89,
      interior: 90,
      electrical: 90
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Quilted Leather'],
      Technology: ['Bang & Olufsen', 'Sport Plus Mode'],
      Exterior: ['Carbon Fiber']
    },
    marketPriceData: [
      { month: 'Jan', price: 27500000 },
      { month: 'Feb', price: 27300000 },
      { month: 'Mar', price: 27000000 },
      { month: 'Apr', price: 26900000 },
      { month: 'May', price: 27300000 },
      { month: 'Jun', price: 27500000 }
    ]
  },
  {
    id: 30,
    brand: 'Maybach',
    model: 'S 560',
    year: 2020,
    slug: slugify('Maybach S 560 2020'),
    price: '₹1,95,00,000',
    originalPrice: '₹2,25,00,000',
    image: '/assets/images/RangeRoverEvoque.avif',
    mileage: '9,500 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seating: 4,
    location: 'Mumbai, Maharashtra',
    condition: 'Excellent',
    features: ['Executive Rear Seats', 'Burmester 3D', 'Magic Sky Control', 'First Class Rear'],
    savings: '₹30,00,000',
    isLiked: false,
    views: 4321,
    conditionHealth: {
      engine: 95,
      tyres: 92,
      paint: 94,
      interior: 96,
      electrical: 95
    },
    featuresDetailed: {
      Safety: [],
      Comfort: ['Executive Rear Seats', 'First Class Rear'],
      Technology: ['Burmester 3D', 'Magic Sky Control'],
      Exterior: []
    },
    marketPriceData: [
      { month: 'Jan', price: 19500000 },
      { month: 'Feb', price: 19200000 },
      { month: 'Mar', price: 19000000 },
      { month: 'Apr', price: 18900000 },
      { month: 'May', price: 19300000 },
      { month: 'Jun', price: 19500000 }
    ]
  }
];
