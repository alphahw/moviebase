import { useState } from 'react'

import Header from '../components/Header'

import '../styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps }) {
  const [viewState, setViewState] = useState(null)
  const [movieTitle, setMovieTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [sideItemCopy, setSideItemCopy] = useState(null)

  return (
    <div>
      <Header
        movieTitle={movieTitle}
        setMovieTitle={setMovieTitle}
        viewState={viewState}
        loading={loading}
        sideItemCopy={sideItemCopy}
      />
      <Component
        movieTitle={movieTitle}
        setViewState={setViewState}
        setLoading={setLoading}
        setSideItemCopy={setSideItemCopy}
        {...pageProps}
      />
    </div>
  )
}

export default MyApp
