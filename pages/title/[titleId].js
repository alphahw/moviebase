import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { useMovieImdbId } from '../../api/api'

import VIEW_STATE from '../../lib/viewState'

import Header from '../../components/Header'
import TitleDetail from '../../components/TitleDetail'

export default function Title({ setViewState, setLoading }) {
  const router = useRouter()

  const [movieImdbId, setMovieImdbId] = useState(router.query.titleId);

  useEffect(() => {
    if (!router.query.titleId) return;
    const decodedMovieImdbId = decodeURIComponent(router.query.titleId)
    if (movieImdbId != decodedMovieImdbId) {
      setMovieImdbId(decodedMovieImdbId)
    }
  }, [movieImdbId, router.query.titleId])

  useEffect(() => {
    setViewState(VIEW_STATE.DETAIL)
  })

  // fetch
  const { movie, isLoading, isError } = useMovieImdbId(movieImdbId)

  useEffect(() => {
    setLoading(isLoading)
  }, [setLoading, isLoading])

  const [title, setTitle] = useState('MovieBase')
  const [description, setDescription] = useState('Find movie information')
  useEffect(() => {
    // console.log(movie)
    if (movie) {
      setTitle(
        `${movie.title}${movie.year ? ` (${movie.year})` : ''} – MovieBase`
      )
      movie.plot && setDescription(movie.plot)
    }
  }, [movie])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="container mx-auto px-4">
        <main
          className="flex flex-col flex-wrap mb-8 space-y-8">

          {/*
          <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
            <p>Sidebar</p>
          </aside>
          */}

          {/*
          <TitleDetail
            className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
            {...currentTitle} />
          */}

          {!isLoading && !isError && <TitleDetail
            className=""
            movie={movie} />}
        </main>
     </div>
    </div>
  )
}
