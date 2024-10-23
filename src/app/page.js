import Results from '@/components/Results';
import React from 'react';

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  // Ensure searchParams is an object and handle undefined cases
  const genre = searchParams?.genre || 'fetchTrending';
  
  const res = await fetch(
    `https://api.themoviedb.org/3${genre === 'fetchTopRated' ? `/movie/top_rated` : `/trending/all/week`}?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  // Check if the response is ok
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
