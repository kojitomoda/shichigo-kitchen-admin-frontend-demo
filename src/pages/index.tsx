import type { NextPage } from 'next'
import Head from 'next/head'
import { usePageView } from '../hooks/use-page-view'
import { Layout as MarketingLayout } from '../layouts/marketing'
import { HomeCta } from '../sections/home/home-cta'
import { HomeFaqs } from '../sections/home/home-faqs'
import { HomeFeatures } from '../sections/home/home-features'
import { HomeHero } from '../sections/home/home-hero'
import { HomeReviews } from '../sections/home/home-reviews'

const Page: NextPage = () => {
  usePageView()

  return (
    <>
      <Head>
        <title>シチゴウキッチン | 運営画面デモ</title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  )
}

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>

export default Page
