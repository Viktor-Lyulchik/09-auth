'use client';

import css from './Modal.module.css';

type NotePreviewModalProps = {
  children: React.ReactNode;
};

const NotePreviewModal = ({ children }: NotePreviewModalProps) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default NotePreviewModal;
