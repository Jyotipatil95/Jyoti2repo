import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Parse the request body coming from your frontend component
    const body = await request.json(); 
    
    // Example payload structure typical for accommodation searches:
    // { destination: "lon", checkIn: "2026-07-01", checkOut: "2026-07-07", rooms: [...] }

    const apiBase = process.env.TRAVEL_COMPOSITOR_API_BASE;
    const apiKey = process.env.TRAVEL_COMPOSITOR_API_KEY;

    // 2. Make the secure server-to-server call to Travel Compositor
    // Note: Adjust the endpoint path ('/accommodation/search') and auth headers 
    // according to the exact specifications in your .xhtml documentation link.
    const response = await fetch(`${apiBase}/accommodation/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Or X-API-KEY depending on their auth standard
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Travel Compositor API error: ${errorData}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 3. Return the data back to your Next.js frontend
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}