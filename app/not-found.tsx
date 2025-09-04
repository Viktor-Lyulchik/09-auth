import type { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
  description: 'This page was not found',
  openGraph: {
    title: '404 | Page Not Found',
    description: 'This page was not found',
    url: 'https://08-zustand-amber-two.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub Logo',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
