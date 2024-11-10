import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Promotion = {
  id: string;
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  link: string;
};

const promotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Early Bird Access',
    description: 'Get 25% off our latest events. Limited spots!',
    discount: '25% OFF',
    imageUrl: '/images/promo1.jpg',
    link: '/events/early-bird',
  },
  {
    id: 'promo2',
    title: 'Exclusive Member Deal',
    description: 'Special savings for our loyal members.',
    discount: '30% OFF',
    imageUrl: '/images/promo2.jpg',
    link: '/events/member-deal',
  },
  {
    id: 'promo3',
    title: 'Newcomers Special',
    description: 'First time? Enjoy this limited-time offer!',
    discount: '20% OFF',
    imageUrl: '/images/promo3.jpg',
    link: '/events/newcomers-special',
  },
];

const PromotionSection: React.FC = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-purple-600 text-center mb-8">
        Hot Promotions Just for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <Link key={promo.id} href={promo.link} passHref>
            <div className="relative cursor-pointer bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <span className="text-white bg-purple-600 px-4 py-2 rounded-full font-bold">
                  {promo.discount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromotionSection;
