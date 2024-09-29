import type { Post } from '../entities/post';
import type { PostRepository } from '../repositories/PostRepository';

export const createPostRepository = (baseUrl: string): PostRepository => {
  return {
    listPosts: async () => {
      const response = await fetch(`${baseUrl}/posts`, { method: 'GET' });
      if (response.ok) {
        const responseBody = (await response.json()) as Post[];
        return responseBody;
      } else {
        throw Error(`[fail - listPosts] ${response.status}`);
      }
    },
    getPost: async (id: Post['id']) => {
      const response = await fetch(`${baseUrl}/posts/${id}`, { method: 'GET' });
      if (response.ok) {
        const responseBody = (await response.json()) as Post;
        return responseBody;
      } else {
        throw Error(`[fail - getPost] ${response.status}`);
      }
    },
  };
};
