import type { Post } from '../../entities/post';
import styles from './PostList.module.css';

const Post = ({
  id,
  title,
  selected,
  onClick,
}: {
  id: number;
  title: string;
  selected: boolean;
  onClick: (id: Post['id']) => void;
}) => {
  return (
    <div
      className={selected ? styles.selectedPost : styles.post}
      onClick={() => {
        onClick(id);
      }}
    >
      <strong>{id}.</strong>
      <div>{title}</div>
    </div>
  );
};

export const PostList = ({
  posts,
  selectedPost,
  onClickPost,
}: {
  posts: Post[] | undefined;
  selectedPost: Post | undefined;
  onClickPost: (id: Post['id']) => void;
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>포스트 목록</div>
      <div className={styles.list}>
        {posts === undefined
          ? 'Loading...'
          : posts.map((post) => (
              <Post
                id={post.id}
                title={post.title}
                key={post.id}
                selected={post.id === (selectedPost?.id ?? 1)}
                onClick={onClickPost}
              />
            ))}
      </div>
    </div>
  );
};
