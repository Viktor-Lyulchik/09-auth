'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { fetchNotes, NotesHttpResponse } from '@/lib/api';

import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

interface AppClientProps {
  tag: string | undefined;
}

export default function AppClient({ tag }: AppClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const saveDebouncedQuery = useDebouncedCallback((query: string) => {
    setDebouncedQuery(query);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    saveDebouncedQuery(event.target.value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<NotesHttpResponse>({
    queryKey: ['notes', { query: debouncedQuery, page: currentPage, tag }],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox searchQuery={query} onChange={handleChange} />}
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {
            <Link className={css.button} href="/notes/action/create">
              Create note +
            </Link>
          }
        </header>
        {isError ? (
          <ErrorMessage />
        ) : (
          data && data.notes.length > 0 && <NoteList notes={data.notes} />
        )}
        {isLoading && <Loader />}
      </div>
      <Toaster />
    </>
  );
}
