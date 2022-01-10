import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import VIEW_STATE from '../lib/viewState'

import Header from '../components/Header'
import TitleListings from '../components/TitleListings'
import TitleDetail from '../components/TitleDetail'

export default function Home({
  movieTitle,
  setMovieTitle,
  setViewState,
  setLoading,
  setSideItemCopy
}) {
  const router = useRouter()

  useEffect(() => {
    setViewState(VIEW_STATE.OVERVIEW)
  })

  return (
    <div>
      <Head>
        <title>MovieBase</title>
        <meta name="description" content="Find movie information" />
      </Head>

      <div className="container mx-auto px-4">
        <main
          className="flex flex-col flex-wrap mb-8 space-y-8"
        >
          <TitleListings
            movieTitle={movieTitle}
            setLoading={setLoading}
            setSideItemCopy={setSideItemCopy}
          />
        </main>
      </div>
    </div>
  )
}
