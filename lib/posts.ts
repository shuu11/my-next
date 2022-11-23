import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';

export type PostsData = {
	id: string;
	date: string;
	title: string;
}[];

const postsDirectory: string = path.join(process.cwd(), '/posts');

export const getSortedPostsData = (): PostsData => {
	// Get file names under /posts
	const fileNames: string[] = fs.readdirSync(postsDirectory);

	const allPostsData: PostsData = fileNames.map((fileName) => {
		// Remove '.md' from file name to get id
		const id: string = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath: string = path.join(postsDirectory, fileName);

		const fileContents: string = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		return {
			id: id,
			date: matterResult.data.date,
			title: matterResult.data.title,
		};
	});

	// Sort posts by date
	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
};