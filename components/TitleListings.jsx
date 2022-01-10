import { useState, useRef, useEffect } from 'react'

import { useMovieTitle } from '../api/api'
import useOnScreen from '../hooks/useOnScreen'

import TitleListing from './TitleListing'

export default function TitleListings({ movieTitle, setLoading, setSideItemCopy }) {
  const ref = useRef()
  const isVisible = useOnScreen(ref)

  const {
    movies,
    isIdle,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    error,
    isValidating,
    mutate,
    size,
    setSize
  } = useMovieTitle(movieTitle)

  const movieElems = movies.reduce(
    (allMovieElems, moviePage) => {
      if (moviePage.search) {
        return allMovieElems.concat(
          moviePage.search.map(
            (movie) => <TitleListing
              key={movie.imdbId}
              movie={movie}
              className="mr-24 lg:mr-0"
            />
          )
        )
      } else {
        return allMovieElems
      }
    }, []
  )

  useEffect(() => {
    let newLoading = false;
    let newSideItemCopy = '';

    if (isLoadingMore && (movies[0] && !movies[0]?.error)) {
      newLoading = true
    }

    if (movieTitle.length && movieElems.length) {
      newSideItemCopy = `Scroll down to load more`
    }

    if (isReachingEnd && movieElems.length) {
      newSideItemCopy = `${movieElems.length} title`
      newSideItemCopy += (movieElems.length != 1 ? 's' : '')
    }

    setLoading(newLoading)
    setSideItemCopy(newSideItemCopy)
  }, [
    isLoadingMore, isReachingEnd, movieTitle.length,
    movies, movieElems.length, setLoading, setSideItemCopy
  ])

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(prevSize => prevSize + 1)
    }
  }, [isVisible, isRefreshing, isReachingEnd, setSize])

  let content;
  if (error) {
    content = <p data-test-load-error>Sorry, an error occured</p>
  }
  if (movies[0]) {
    const firstMovies = movies[0]  
    if (firstMovies.error) {
      content = <p data-test-content-error>{firstMovies.error}</p>
    }
  }
  if (movieElems.length) {
    content = <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">{movieElems}</ul>
  }

  return (
    <div className="w-full">
      {content}
      <div ref={ref} className="h-1">
      </div>
    </div>
  )
}