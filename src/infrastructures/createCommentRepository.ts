import type { Comment } from '../entities/comment';
import type { CommentRepository } from '../repositories/CommentRepository';

export const createCommentRepository = (baseUrl: string): CommentRepository => {
  return {
    listComments: async (id: Comment['postId']) => {
      const response = await fetch(`${baseUrl}/posts/${id}/comments`, {
        method: 'GET',
      });
      if (response.ok) {
        const responseBody = (await response.json()) as Comment[];
        return responseBody;
      } else {
        throw Error(`[fail - listCommnets] ${response.status}`);
      }
    },
  };
};
