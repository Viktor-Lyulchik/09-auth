'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { getMe, updateMe } from '@/lib/api/clientApi';
import Loader from '@/app/loading';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMe() {
      if (user) {
        setUserName(user.username || '');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const currentUser = await getMe();
        setUserName(currentUser.username || '');
        setUser(currentUser);
      } catch {
        setError('Unable to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [user, setUser]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedUser = await updateMe({ username });
    setUser(updatedUser);
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <Loader />;
  if (!user) {
    router.push('/sign-in');
    return <></>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={150}
          height={150}
          className={css.avatar}
        />
        {error && <p className={css.error}>{error}</p>}
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={event => setUserName(event.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
