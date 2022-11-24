import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type PostsData = {
	id: string;
	date: string;
	title: string;
};

const postsDirectory: string = path.join(process.cwd(), './src/posts');

export const getSortedPostsData = (): PostsData[] => {
	// Get file names under /posts
	const fileNames: string[] = fs.readdirSync(postsDirectory);

	const allPostsData: PostsData[] = fileNames.map((fileName) => {
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

export type Ids = {
	params: {
		id: string;
	};
};

export function getAllPostIds(): Ids[] {
	const fileNames: string[] = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export type GetPostData = {
	id: string;
	contentHtml: string;
	date: string;
	title: string;
};

export async function getPostData(id: string): GetPostData {
	const fullPath: string = path.join(postsDirectory, `${id}.md`);
	const fileContents: string = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark().use(html).process(matterResult.content);

	const contentHtml = processedContent.toString();

	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}
