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
  selectedPostId,
  setSelectedPostId,
}: {
  posts: Post[] | undefined;
  selectedPostId: number;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const onClick = (id: Post['id']) => {
    setSelectedPostId(id);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>포스트 목록</div>
      <div className={styles.list}>
        {posts === undefined
          ? 'Loading...'
          : posts.map((post, index) => (
              <Post
                id={post.id}
                title={post.title}
                key={post.id}
                selected={index + 1 === selectedPostId}
                onClick={onClick}
              />
            ))}
      </div>
    </div>
  );
};
