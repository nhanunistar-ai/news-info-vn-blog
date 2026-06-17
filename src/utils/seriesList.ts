import { getCollection } from 'astro:content';
import { fetchPosts } from '~/utils/blog';
import type { Post } from '~/types';

export async function getCategoryItems(categorySlug: string): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const categoryPosts = allPosts.filter(post => post.category?.slug === categorySlug);
  
  const seriesEntries = await getCollection('series');
  
  const standalonePosts = categoryPosts.filter(post => !post.series);
  const seriesPosts = categoryPosts.filter(post => post.series);
  
  // Group series posts by series slug
  const seriesMap = new Map<string, Post[]>();
  for (const post of seriesPosts) {
    if (!post.series) continue;
    if (!seriesMap.has(post.series)) {
      seriesMap.set(post.series, []);
    }
    seriesMap.get(post.series)!.push(post);
  }
  
  const seriesItems: Post[] = [];
  
  for (const [seriesSlug, postsInSeries] of seriesMap.entries()) {
    const seriesData = seriesEntries.find(s => s.id === seriesSlug)?.data;
    
    // Find the latest publish date among the series posts to sort it properly
    const latestDate = postsInSeries.reduce((latest, post) => {
      return post.publishDate > latest ? post.publishDate : latest;
    }, postsInSeries[0].publishDate);
    
    // Create a mock Post object for the series
    seriesItems.push({
      id: `series-${seriesSlug}`,
      slug: seriesSlug,
      permalink: `/${categorySlug}/${seriesSlug}`, // This will be handled by ListItem if we set series
      publishDate: latestDate,
      title: seriesData?.title || seriesSlug,
      excerpt: seriesData?.description || '',
      image: seriesData?.image || postsInSeries[0].image,
      category: postsInSeries[0].category, // keep the category
      series: seriesSlug, // This flag can be used in ListItem to know it's a series
      tags: [],
      readingTime: undefined,
    });
  }
  
  // Merge standalone posts and series items, then sort by publishDate descending
  const combined = [...standalonePosts, ...seriesItems];
  combined.sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
  
  return combined;
}
