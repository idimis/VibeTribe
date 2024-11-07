"use client";

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import musicIcon from '@/public/icons/music.png';
import nightlifeIcon from '@/public/icons/nightlife.png';
import artsIcon from '@/public/icons/arts.png';
import holidaysIcon from '@/public/icons/holiday.png';
import foodIcon from '@/public/icons/food.png';
interface Category {
  name: string;
  slug: string;
  icon: StaticImageData; 
}

const categories: Category[] = [
  { name: 'Music', slug: 'music', icon: musicIcon },
  { name: 'Nightlife', slug: 'nightlife', icon: nightlifeIcon },
  { name: 'Performing & Visual Arts', slug: 'arts', icon: artsIcon },
  { name: 'Holidays', slug: 'holidays', icon: holidaysIcon },
  { name: 'Food & Drinks', slug: 'food-drinks', icon: foodIcon },
];

const CategorySection: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <div className="flex flex-wrap justify-center md:justify-around">
        {categories.map((category) => (
          <Link
            href={`/events/${category.slug}`}
            key={category.slug}
            className="flex flex-col items-center cursor-pointer mb-4 w-1/2 md:w-1/5"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-gray-200 bg-transparent rounded-full flex items-center justify-center mb-2">
              <Image
                src={category.icon}
                alt={category.name}
                width={64}
                height={64}
                className="object-contain"
                priority
                style={{
                  backgroundColor: 'transparent', 
                }}
              />
            </div>
            <span className="mt-2 text-sm md:text-lg text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
