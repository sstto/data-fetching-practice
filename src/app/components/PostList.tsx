import styles from './PostList.module.css';

const Post: React.FC<{ id: number; title: string }> = ({ id, title }) => {
  return (
    <div className={styles.post}>
      <strong>{id}.</strong>
      <div>{title}</div>
    </div>
  );
};

export const PostList = () => {
  const mock: { id: number; title: string }[] = [
    { id: 1, title: '목록1' },
    { id: 2, title: '목록2' },
    { id: 3, title: '목록3' },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>포스트 목록</div>
      <div className={styles.list}>
        {mock.map((post) => (
          <Post id={post.id} title={post.title} key={post.id} />
        ))}
      </div>
    </div>
  );
};
