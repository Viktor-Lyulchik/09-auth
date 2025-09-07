'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTags } from '@/lib/api/clientApi';

import css from './TagsMenu.module.css';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getTags().then(data => setTags(data));
  }, []);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
