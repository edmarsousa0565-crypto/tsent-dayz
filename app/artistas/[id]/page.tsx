import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import data from '@/app/data.json';
import ArtistProfile from '@/components/ArtistProfile';

// Pré-gera uma página estática por artista
export function generateStaticParams() {
  return data.artists.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artist = data.artists.find((a) => a.id === id);
  if (!artist) return { title: 'Artista — TSENT SYDAZ' };
  return {
    title: `${artist.name} — TSENT SYDAZ`,
    description: artist.bio,
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = data.artists.find((a) => a.id === id);
  if (!artist) notFound();

  // Faixas do artista (filtradas do catálogo pelo nome)
  const tracks = data.catalogue.tracks.filter((t) => t.artist === artist.name);

  return <ArtistProfile artist={artist} tracks={tracks} />;
}
