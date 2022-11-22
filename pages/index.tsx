import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import scss from '/styles/Home.module.scss';
import utilscss from '../styles/utils.module.scss';

export default function Home() {
	return (
		<Layout home={true}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilscss.headingMd}>
				<p>[Your Self Introduction]</p>
				<p>
				(This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
		</Layout>
	);
}
