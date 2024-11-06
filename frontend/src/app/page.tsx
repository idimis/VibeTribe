import React from 'react';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel'; 
import CategoryIcon from '@/components/CategoryIcon';
import EventSection from '@/components/EventSection';
import MoreEvents from '@/components/MoreEvents';
import WhereToNext from '@/components/WheretoNext';

const Page: React.FC = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <CategoryIcon />
      <EventSection />
      <WhereToNext />
      <MoreEvents />
      <Footer />
    </div>
  );
};

export default Page;
