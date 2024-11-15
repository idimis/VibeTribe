import { NextResponse } from "next/server";

const events = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Event Title ${index + 1}`,
  date: `November ${index + 1}, 2024`,
  location: `Location ${index + 1}`,
  description: `This is a detailed description for Event ${index + 1}.`,
  latitude: -6.9175 + (Math.random() - 0.5) * 0.1,
  longitude: 107.6191 + (Math.random() - 0.5) * 0.1,
}));

export async function GET(request: Request) {
  
  const url = new URL(request.url);
  const idParam = url.pathname.split("/").pop();
  
  if (!idParam) {
    return NextResponse.json({ message: "Event ID is missing" }, { status: 400 });
  }
  
  const eventId = parseInt(idParam);
  if (isNaN(eventId)) {
    return NextResponse.json({ message: "Invalid event ID" }, { status: 400 });
  }

  const event = events.find((e) => e.id === eventId);
  if (event) {
    return NextResponse.json(event);
  } else {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
}
