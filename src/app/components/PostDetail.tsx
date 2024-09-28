import styles from './PostDetail.module.css';

const Comment: React.FC<{ author: string; comment: string }> = ({
  author,
  comment,
}) => {
  return (
    <>
      <div className={styles.comment}>
        <strong>작성자: {author}</strong>
        <div>{comment}</div>
      </div>
    </>
  );
};

export const PostDetail = () => {
  const mock = [
    { id: 1, author: '영인', comment: '너무 좋아' },
    { id: 2, author: '영인', comment: '너무 좋아' },
    { id: 3, author: '영인', comment: '너무 좋아' },
    { id: 4, author: '영인', comment: '너무 좋아' },
    { id: 5, author: '영인', comment: '너무 좋아' },
  ];
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>내용</div>
          <div className={styles.content}>
            블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
          </div>
        </div>
        <div>
          <div className={styles.title}>댓글</div>
          <div className={styles.commentList}>
            {mock.map((comment) => (
              <Comment
                author={comment.author}
                comment={comment.comment}
                key={comment.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
