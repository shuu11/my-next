import { React, Head, Image, Link, Script } from 'nextImport';
import { Ids, getAllPostIds } from '@lib/posts.ts';
import { GetPostsData, getPostData } from '@lib/posts.ts';
import Layout from '@components/layout';

import { GetStaticProps } from 'next';
import { GetStaticPaths } from 'next';
import { PostsData } from '@lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: Ids = getAllPostIds();

	return {
		paths: paths,
		fallback: false,
	};
};


export const getStaticProps: GetStaticProps<{ postData: GetPostsData[] }> = async ({ params }: Ids) => {
	const postData: GetPostsData = getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
};

export default function Post({ postData }: GetPostsData) {
	return (
		<Layout home={false}>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
		</Layout>
	);
}
