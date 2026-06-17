// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';
import astrowind from './vendor/integration/index.js';

const siteUrl = 'https://news.info.vn';

function openExternalLinksInNewTab() {
	const ownHosts = new Set(['news.info.vn', 'www.news.info.vn']);

	function isExternalLink(href) {
		if (!href || !/^https?:\/\//i.test(href)) return false;

		try {
			const url = new URL(href);
			return !ownHosts.has(url.hostname);
		} catch {
			return false;
		}
	}

	function visit(node) {
		if (!node || typeof node !== 'object') return;

		if (node.type === 'element' && node.tagName === 'a' && isExternalLink(node.properties?.href)) {
			node.properties = {
				...node.properties,
				target: '_blank',
				rel: 'noopener noreferrer',
			};
		}

		if (Array.isArray(node.children)) {
			for (const child of node.children) visit(child);
		}
	}

	return (tree) => visit(tree);
}

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	integrations: [
		astrowind(),
		mdx(),
		sitemap(),
		icon({
			include: {
				tabler: ['*'],
				'flat-color-icons': [
					'template',
					'gallery',
					'approval',
					'document',
					'advertising',
					'currency-exchange',
					'voice-presentation',
					'business-contact',
					'database',
				],
			},
		}),
	],
	markdown: {
		rehypePlugins: [openExternalLinksInNewTab],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
