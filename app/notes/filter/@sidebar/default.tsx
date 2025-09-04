import { getTags } from '@/lib/api';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

export default async function SidebarNotes() {
  const tags = await getTags();
  return (
    <>
      <Link href="/notes/action/create" className={css.menuLink}>
        Create note
      </Link>
      <ul className={css.menuList}>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
