
import { BlogPost, CreatePostData, UpdatePostData } from '@/types/blog';

const STORAGE_KEY = 'blog_posts';

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getBlogPosts = (): BlogPost[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const getBlogPost = (slug: string): BlogPost | null => {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
};

export const createBlogPost = (data: CreatePostData): BlogPost => {
  const posts = getBlogPosts();
  const baseSlug = generateSlug(data.title);
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug is unique
  while (posts.some(post => post.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: data.title,
    content: data.content,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updateBlogPost = (slug: string, data: UpdatePostData): BlogPost | null => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.slug === slug);
  
  if (index === -1) return null;

  const updatedPost = {
    ...posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // If title changed, generate new slug
  if (data.title && data.title !== posts[index].title) {
    const baseSlug = generateSlug(data.title);
    let newSlug = baseSlug;
    let counter = 1;

    while (posts.some((post, i) => post.slug === newSlug && i !== index)) {
      newSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    updatedPost.slug = newSlug;
  }

  posts[index] = updatedPost;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updatedPost;
};

export const deleteBlogPost = (slug: string): boolean => {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.slug !== slug);
  
  if (filteredPosts.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  return true;
};
