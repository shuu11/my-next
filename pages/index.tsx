import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

import { PostsData, getSortedPostsData } from '../lib/posts.ts';

import scss from '/styles/Home.module.scss';
import utilscss from '../styles/utils.module.scss';

export async function getStaticProps() {
	const allPostsData: PostsData = getSortedPostsData();

	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }: PostsData) {
	return (
		<Layout home={true}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilscss.headingMd}>
				<p>[Your Self Introduction]</p>
				<p>
					(This is a sample website - you’ll be building a site like this on
					<br />
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>

			<section className={`${utilscss.headingMd} ${utilscss.padding1px}`}>
				<h2 className={utilscss.headingLg}>Blog</h2>
				<ul className={utilscss.list}>
					{allPostsData.map(({ id, date, title }:PostsData) => {
						return (
							<li className={utilscss.listItem} key={id}>
								{title}
								<br />
								{id}
								<br />
								{date}
								<br />
							</li>
						);
					})}
				</ul>
			</section>
		</Layout>
	);
}
