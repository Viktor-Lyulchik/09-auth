import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = async () => {
  return (
    <header className={css.header}>
      <Link className="headerLink" href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav className="navigation" aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className="navigationLink" href="/">
              Home
            </Link>
          </li>
          <AuthNavigation />
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
