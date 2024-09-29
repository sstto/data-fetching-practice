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
  selectedPostId,
  repositories,
}: {
  selectedPostId: number;
  repositories: {
    postRepository: PostRepository;
    commentRepository: CommentRepository;
  };
}) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    setPost(undefined);
    setComments(undefined);
  }, [selectedPostId]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const data = await repositories.postRepository.getPost(selectedPostId);
      if (!ignore) {
        setPost(data);
      }
    };
    fetchData().catch(() => null);
    return () => {
      ignore = true;
    };
  }, [selectedPostId, repositories]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const data =
        await repositories.commentRepository.listComments(selectedPostId);
      if (!ignore) {
        setComments(data);
      }
    };
    fetchData().catch(() => null);
    return () => {
      ignore = true;
    };
  }, [selectedPostId, repositories]);

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>내용</div>
          <div className={styles.content}>
            {post === undefined ? 'Loading...' : post.body}
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
