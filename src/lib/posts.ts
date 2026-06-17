import type { CollectionEntry } from 'astro:content';

const SITE_TIME_ZONE = 'Asia/Ho_Chi_Minh';

function dateKey(date: Date) {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: SITE_TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(date);
}

export function isPublishedDate(pubDate: Date, now = new Date()) {
	return dateKey(pubDate) <= dateKey(now);
}

export function isPublishedPost(data: CollectionEntry<'blog'>['data']) {
	return !data.draft && isPublishedDate(data.pubDate);
}
