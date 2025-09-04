import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import css from './NotesPage.module.css';
import AppClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type AppProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: AppProps): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0];

  return {
    title: `Notes - ${tag}`,
    description: `Notes - ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Notes - ${tag}`,
      url: 'https://08-zustand-amber-two.vercel.app/',
      siteName: 'Note HUB app',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Note HUB app image',
        },
      ],
      type: 'website',
    },
  };
}

export default async function App({ params }: AppProps) {
  const { slug } = await params;

  const tag = slug[0].toLowerCase() === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { query: '', page: 1, tag }],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
