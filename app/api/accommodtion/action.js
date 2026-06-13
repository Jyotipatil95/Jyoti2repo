// app/accommodation/actions.js
'use server';

export async function fetchHotels(searchData) {
  const res = await fetch(`${process.env.TRAVEL_COMPOSITOR_API_BASE}/accommodation/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TRAVEL_COMPOSITOR_API_KEY}`,
    },
    body: JSON.stringify(searchData),
  });
  return res.json();
}