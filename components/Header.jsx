import { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import VIEW_STATE from '../lib/viewState'

import DebouncedInput from '../components/DebouncedInput'

export default function Header({ viewState, movieTitle, setMovieTitle, loading, sideItemCopy }) {
  const router = useRouter();

  function handleTitleChange(title) {
    if (!title.length) return;
    setMovieTitle(title);
  }

  let sideItem = null;
  if (viewState == VIEW_STATE.DETAIL) {
    if (movieTitle) {
      sideItem = <button
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => router.back()}
        data-test-back-button
      >Back to search</button>
    } else {
      sideItem = <Link href="/"><button
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
        data-test-new-search-button
      >Go to search</button></Link>
    }
  } else if (viewState == VIEW_STATE.OVERVIEW) {
    const sideItemCopyClass = (sideItemCopy && loading ? 'mr-4' : null)
    sideItem = (<div className="flex items-center">
      {sideItemCopy ? <p className={sideItemCopyClass}>{sideItemCopy}</p> : null}
      {loading ? <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> : null}
    </div>);
  }

  return (
    <header className="sticky top-0 container mx-auto px-4">
      <div className={`flex flex-wrap bg-white items-center` + (viewState == VIEW_STATE.OVERVIEW ? ' py-4 lg:py-8' : ' pt-4 lg:pt-8')}>
        <Link href="/">
          <h1 className="mr-auto text-xl font-bold">MovieBase</h1>
        </Link>
        {sideItem}
      </div>
      {viewState == VIEW_STATE.OVERVIEW ?
        <DebouncedInput
          className="appearance-none border rounded w-full py-3 px-4 text-gray-500 text-xl lg:text-5xl focus:outline-none"
          placeholder="Type to search movies"
          query={movieTitle}
          onChange={handleTitleChange}
        /> : null}
      <div className="h-8 bg-gradient-to-b from-white to-transparent"></div>
    </header>
  )
}
