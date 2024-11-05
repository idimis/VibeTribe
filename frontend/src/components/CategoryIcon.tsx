import Link from 'next/link';

const categories = [
  { name: 'Music', slug: 'music' },
  { name: 'Nightlife', slug: 'nightlife' },
  { name: 'Performing & Visual Arts', slug: 'arts' },
  { name: 'Holidays', slug: 'holidays' },
  { name: 'Food & Drinks', slug: 'food-drinks' },
];

const CategorySection: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <div className="flex flex-wrap justify-center md:justify-around">
        {categories.map((category) => (
          <Link href={`/events/${category.slug}`} key={category.slug} className="flex flex-col items-center cursor-pointer mb-4 w-1/2 md:w-1/5">
            {/* Placeholder for icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-500 text-sm md:text-base">Icon Here</span>
            </div>
            <span className="mt-2 text-sm md:text-lg text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
