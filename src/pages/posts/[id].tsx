import { React, Head, Image, Link, Script } from 'nextImport';
import { Ids, getAllPostIds } from '@lib/posts.ts';
import { GetPostsData, getPostData } from '@lib/posts.ts';
import Layout from '@components/layout';

import { GetStaticProps } from 'next';

export async function getStaticPaths() {
	const paths: Ids = getAllPostIds();

	return {
		paths: paths,
		fallback: false,
	};
}


export async function getStaticProps({ params }) {
	const postData: GetPostsData = getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
}

export default function Post({ postData }: GetPostsData) {
	return (
		<div>
			<Layout home={false}>
				{postData.title}
				<br />
				{postData.id}
				<br />
				{postData.date}
			</Layout>
		</div>
	);
}
