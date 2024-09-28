import styles from './App.module.css';
import { PostDetail } from './components/PostDetail';
import { PostList } from './components/PostList';

export const App = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <PostList />
        <div className={styles.sep}></div>
        <PostDetail />
      </div>
    </>
  );
};
