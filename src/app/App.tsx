import { useEffect, useMemo, useState } from 'react';

import type { Post } from '../entities/post';
import { createCommentRepository } from '../infrastructures/createCommentRepository';
import { createPostRepository } from '../infrastructures/createPostRepository';
import { coerceIn } from '../utils/util';
import styles from './App.module.css';
import { PostDetail } from './components/PostDetail';
import { PostList } from './components/PostList';

const baseUrl: string = 'https://jsonplaceholder.typicode.com/';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPostId, setSelectedPostId] = useState(1);

  const repositories = useMemo(() => {
    const postRepository = createPostRepository(baseUrl);
    const commentRepository = createCommentRepository(baseUrl);
    return { postRepository, commentRepository };
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const data = await repositories.postRepository.listPosts();
      if (!ignore) {
        setPosts(data);
      }
    };
    fetchData().catch(() => null);
    return () => {
      ignore = true;
    };
  }, [repositories]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      [
        { key: 'ArrowUp', value: -1 },
        { key: 'ArrowDown', value: 1 },
      ].forEach(({ key, value }) => {
        if (event.key !== key) return;
        event.preventDefault();
        setSelectedPostId((prev) => {
          const maxId =
            posts === undefined ? 1 : Math.max(...posts.map((post) => post.id));
          return coerceIn(
            prev + value,
            1,
            posts?.findLast === undefined ? 1 : maxId,
          );
        });
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [posts]);

  return (
    <>
      <div className={styles.wrapper}>
        <PostList
          posts={posts}
          selectedPostId={selectedPostId}
          setSelectedPostId={setSelectedPostId}
        />
        <div className={styles.sep}></div>
        <PostDetail
          selectedPostId={selectedPostId}
          repositories={repositories}
        />
      </div>
    </>
  );
};
