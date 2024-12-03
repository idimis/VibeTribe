export const events = [
  { id: 1, title: "Cultural Dance Performance" },
  { id: 2, title: "Theater Play: The Legend of Bali" },
  { id: 3, title: "Modern Dance Showcase" },
  { id: 4, title: "Chinese New Year Festival" },
  { id: 5, title: "Eid Celebration" },
  { id: 6, title: "Ramadhan Night Bazaar" },
  { id: 7, title: "Bali Arts Festival" },
  { id: 8, title: "Jakarta Food Festival" },
  { id: 9, title: "Wine Festival" },
  { id: 10, title: "Coffee Lovers Gathering" },
  { id: 11, title: "Jazz Night at the Rooftop" },
  { id: 12, title: "Reggae Fest" },
  { id: 13, title: "Nightlife Tour" },
  { id: 14, title: "Outdoor Film Screening" },
  { id: 15, title: "Culinary Experience: Indonesian Flavors" },
  { id: 16, title: "Cultural Arts Night" },
  { id: 17, title: "Balinese Food Festival" },
  { id: 18, title: "Celebrating Lunar New Year" },
  { id: 19, title: "Karaoke Night" },
  { id: 20, title: "Traditional Puppet Show" },
  { id: 26, title: "Indonesian Rock Festival" },
  { id: 27, title: "Acoustic Night" },
  { id: 28, title: "Jazz Under the Stars" },
  { id: 29, title: "DJ Night" },
  { id: 30, title: "Sunset Chillout Session" }
];


export const eventsByTitle = events.reduce((acc, event) => {
  acc[event.title] = event.id;
  return acc;
}, {} as Record<string, number>);
