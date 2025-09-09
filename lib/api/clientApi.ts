import { nextServer } from './api';
import { User } from '../../types/user';
import type { Note, NotePost } from '../../types/note';
export type NoteId = Note['id'];

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParam {
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

  const response = await nextServer.get<NotesHttpResponse>(`/notes`, {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {});

  return response.data;
};

export const createNote = async (note: NotePost): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, note, {});

  return response.data;
};

export const deleteNote = async (id: NoteId): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {});

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

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export type CheckSessionRequest = {
  accessToken: string;
  refreshToken?: string;
};

export const checkSession = async (): Promise<void> => {
  await nextServer.get<CheckSessionRequest>('/auth/session');
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateRequest = {
  email: string;
  username: string;
};

export async function updateMe(update: Partial<UpdateRequest>): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', update);
  return data;
}
