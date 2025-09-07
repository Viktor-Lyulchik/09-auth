import { nextServer } from './api';
import { cookies } from 'next/headers';
import {
  NoteId,
  NotesHttpResponse,
  FetchNotesParam,
  ALL_TAGS,
  RegisterRequest,
  LoginRequest,
  CheckSessionRequest,
} from './clientApi';
import { User } from '../../types/user';
import type { Note, NotePost } from '../../types/note';

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (
  query: string,
  page: number = 1,
  tag?: string
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();

  const params: FetchNotesParam = {
    search: query,
    page: page,
    perPage: 12,
  };

  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response = await nextServer.get<NotesHttpResponse>(`/notes`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const createNote = async (note: NotePost): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.post<Note>(`/notes`, note, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const deleteNote = async (id: NoteId): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const getTags = async (): Promise<string[]> => {
  const { notes } = await fetchNotes('');
  return [...ALL_TAGS, ...notes.map(note => note.tag)].filter(
    (tag, index, array) => array.indexOf(tag) === index
  );
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const cookieStore = await cookies();
  const res = await nextServer.post<User>('/auth/register', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const cookieStore = await cookies();
  const res = await nextServer.post<User>('/auth/login', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  await nextServer.post('/auth/logout', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};
