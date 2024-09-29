import type { Post } from '../entities/post';

export type PostRepository = {
  listPosts: () => Promise<Post[]>;
  getPost: (id: Post['id']) => Promise<Post>;
};
