import type { Comment } from '../entities/comment';

export type CommentRepository = {
  listComments: (id: Comment['postId']) => Promise<Comment[]>;
};
