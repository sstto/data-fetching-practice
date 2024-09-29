import { useEffect, useState } from 'react';

import type { Comment } from '../../entities/comment';
import type { Post } from '../../entities/post';
import type { CommentRepository } from '../../repositories/CommentRepository';
import type { PostRepository } from '../../repositories/PostRepository';
import styles from './PostDetail.module.css';

const Comment = ({ author, comment }: { author: string; comment: string }) => {
  return (
    <>
      <div className={styles.comment}>
        <strong>작성자: {author}</strong>
        <div>{comment}</div>
      </div>
    </>
  );
};

export const PostDetail = ({
  selectedPost,
  repositories,
}: {
  selectedPost: Post | undefined;
  repositories: {
    postRepository: PostRepository;
    commentRepository: CommentRepository;
  };
}) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    setComments(undefined);
    let ignore = false;
    const fetchData = async () => {
      const data = await repositories.commentRepository.listComments(
        selectedPost?.id ?? 1,
      );
      if (!ignore) {
        setComments(data);
      }
    };
    fetchData().catch(() => null);
    return () => {
      ignore = true;
    };
  }, [selectedPost, repositories]);

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>내용</div>
          <div className={styles.content}>
            {selectedPost === undefined ? 'Loading...' : selectedPost.body}
          </div>
        </div>
        <div>
          <div className={styles.title}>댓글</div>
          <div className={styles.commentList}>
            {comments === undefined
              ? 'Loading...'
              : comments.map((comment) => (
                  <Comment
                    author={comment.email}
                    comment={comment.body}
                    key={comment.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
