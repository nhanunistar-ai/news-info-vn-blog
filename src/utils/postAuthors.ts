const AUTHORS = [
	'Minh Quan',
	'Hoang Nam',
	'Bao Nguyen',
	'Gia Huy',
	'Anh Khoa',
	'Duc Anh',
	'Thanh Lam',
	'Mai Phuong',
	'Thu Ha',
	'Ngoc Linh',
	'Phuong Anh',
	'Khanh Vy',
	'Quoc Bao',
	'Tuan Minh',
	'Lam Son',
	'Ha Nguyen',
];

export function getPostAuthor(seed: string, author?: string) {
	if (author?.trim()) return author.trim();

	const hash = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
	return AUTHORS[hash % AUTHORS.length];
}
