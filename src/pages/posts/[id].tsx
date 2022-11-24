import { React, Head, Image, Link, Script } from 'nextImport';

import { Ids, getAllPostIds } from '@lib/posts.ts';
import { GetPostsData, getPostData } from '@lib/posts.ts';
import Layout from '@components/layout';

import { GetStaticProps } from 'next';
import { GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: Ids = getAllPostIds();

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ postData: GetPostsData[] }> = async ({ params }: Ids) => {
	const postData: GetPostsData = await getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
};

export default function Post({ postData }: GetPostsData) {
	return (
		<Layout home={false}>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</Layout>
	);
}
