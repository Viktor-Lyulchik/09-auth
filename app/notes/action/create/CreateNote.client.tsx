'use client';

import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNoteClient() {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    refetchOnMount: false,
  });
  return <NoteForm tags={tags} />;
}
