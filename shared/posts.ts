export interface Post {
  message: string;
  createdAt: Date;
  name: string;
}
export type Posts = Post[] | null;

export function cnvPosts(posts: Posts) {
  return posts!.map(post => ({ ...post, createdAt: new Date(post.createdAt) }));
}
