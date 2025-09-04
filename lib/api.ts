import axios from 'axios';
import type { Note, NotePost, NoteTag } from '../types/note';

export type NoteId = Note['id'];

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParam {
  search: string;
  page: number;
  perPage: number;
  tag?: string;
}

export const fetchNotes = async (
  query: string,
  page: number = 1,
  tag?: string
): Promise<NotesHttpResponse> => {
  const params: FetchNotesParam = {
    search: query,
    page: page,
    perPage: 12,
  };

  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response = await axios.get<NotesHttpResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const createNote = async (note: NotePost): Promise<Note> => {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    note,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (id: NoteId): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const ALL_TAGS = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export const getTags = async (): Promise<string[]> => {
  const { notes } = await fetchNotes('');
  return [...ALL_TAGS, ...notes.map(note => note.tag)].filter(
    (tag, index, array) => array.indexOf(tag) === index
  );
};
