import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import scss from './layout.module.scss';
import utilscss from '../styles/utils.module.scss';

const name: string = 'your name';
export const siteTitle: string = 'Next.js Sample Website';

type Props = {
	home: boolean;
	children: React.ReactNode;
};

export default function Layout(props: Props) {
	let { home, children }: Props = props;

	return (
		<div className={scss.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="Learn how to build a personal website using Next.js" />
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>

			<header className={scss.header}>
				{home === true ? (
					<>
						<Image priority src="/images/profile.png" className={utilscss.borderCircle} alt="" width={144} height={144}></Image>
						<h1 className={utilscss.heading2Xl}>{name}</h1>
					</>
				) : (
					<>
						<Link href="/">
							<Image priority src="/images/profile.png" className={utilscss.borderCircle} alt="" width={108} height={108}></Image>
						</Link>
						<h2 className={utilscss.headingLg}>
							<Link href="/" className={utilscss.colorInherit}>
								{name}
							</Link>
						</h2>
					</>
				)}
			</header>

			<main>{children}</main>

			{home !== true ? (<>
			<div className={scss.backToHome}>
				<Link href="/">← Back to home</Link>
			</div>
			</>):(<></>) }
		</div>
	);
}
