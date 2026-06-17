import { fetchPosts } from './blog';
import type { Post } from '~/types';

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const allPosts = await fetchPosts();
  return allPosts.filter((post) => post.category?.slug?.toLowerCase() === category.toLowerCase());
};

export const getSeriesByCategory = async (category: string) => {
  const posts = await getPostsByCategory(category);
  const seriesMap = new Map<
    string,
    { title: string; description?: string; parts: Array<{ title: string; slug: string; chapter: number }> }
  >();

  posts.forEach((post) => {
    if (post.series && post.chapter) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, {
          title: post.title || '',
          description: post.excerpt || '',
          parts: [],
        });
      }

      const series = seriesMap.get(post.series);
      if (series) {
        series.parts.push({
          title: post.title,
          slug: post.slug,
          chapter: post.chapter,
        });
      }
    }
  });

  // Sort parts by chapter
  seriesMap.forEach((series) => {
    series.parts.sort((a, b) => a.chapter - b.chapter);
  });

  return Array.from(seriesMap.entries()).map(([slug, data]) => ({
    slug,
    ...data,
  }));
};

export const getStandalonePostsByCategory = async (category: string): Promise<Post[]> => {
  const posts = await getPostsByCategory(category);
  return posts.filter((post) => !post.series);
};
