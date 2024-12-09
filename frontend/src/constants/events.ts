export const events = [
  { id: 1, title: "Jakarta Night Bash" },
  { id: 2, title: "Bali Beach Party" },
  { id: 3, title: "Surabaya Rooftop Night" },
  { id: 4, title: "Yogyakarta Night Market" },
  { id: 5, title: "Medan Midnight Cinema" },
  { id: 6, title: "Jakarta Symphony Orchestra" },
  { id: 7, title: "Bali Traditional Dance Festival" },
  { id: 8, title: "Bandung Art and Theatre Show" },
  { id: 9, title: "Surabaya Puppetry Carnival" },
  { id: 10, title: "Medan Opera Night" },
  { id: 11, title: "Jakarta Independence Day Parade" },
  { id: 12, title: "Bali Nyepi Day Observance" },
  { id: 13, title: "Eid Al-Fitr Celebration" },
  { id: 14, title: "Chinese New Year in Medan" },
  { id: 15, title: "Diwali in Jakarta" },
  { id: 16, title: "Jakarta Vegan Festival" },
  { id: 17, title: "Bali Seafood Festival" },
  { id: 18, title: "Bandung Coffee Journey" },
  { id: 19, title: "Surabaya Street Food Tour" },
  { id: 20, title: "Medan Spice Market" },
  { id: 21, title: "Jakarta Jazz Festival" },
  { id: 22, title: "Bali Reggae Starfest" },
  { id: 23, title: "Bandung Indie Music Scene" },
  { id: 24, title: "Surabaya Rock Festival" },
  { id: 25, title: "Medan Classical Music Nights" },
  { id: 26, title: "Avicii World Tour" },
  { id: 27, title: "Pesta Pora" },
  { id: 28, title: "Pesta Pora" },
  { id: 29, title: "Pesta Pora" },
  { id: 30, title: "Pesta Pora" },
  { id: 31, title: "Makan Besar Fest" },
  { id: 32, title: "Makan Besar Fest" },
  
];


export const eventsByTitle = events.reduce((acc, event) => {
  acc[event.title] = event.id;
  return acc;
}, {} as Record<string, number>);
