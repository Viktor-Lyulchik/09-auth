import { NotePost } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: NotePost = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
  draft: NotePost;
  setDraft: (note: NotePost) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft', partialize: state => ({ draft: state.draft }) }
  )
);
