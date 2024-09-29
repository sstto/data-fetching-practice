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
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const selectedPost =
    posts.find((p) => p.id === selectedPostId) ?? posts.at(0);

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
          const minId = Math.min(...posts.map((post) => post.id));
          const maxId = Math.max(...posts.map((post) => post.id));
          const prevWithFallback = prev ?? posts.at(0)?.id ?? 1;
          return coerceIn(prevWithFallback + value, minId, maxId);
        });
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [posts]);

  const onClickPost = (id: Post['id']) => {
    setSelectedPostId(id);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <PostList
          posts={posts}
          selectedPost={selectedPost}
          onClickPost={onClickPost}
        />
        <div className={styles.sep}></div>
        <PostDetail selectedPost={selectedPost} repositories={repositories} />
      </div>
    </>
  );
};
