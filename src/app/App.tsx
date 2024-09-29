import { useEffect, useMemo, useState } from 'react';

import type { Post } from '../entities/post';
import { createCommentRepository } from '../infrastructures/createCommentRepository';
import { createPostRepository } from '../infrastructures/createPostRepository';
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
