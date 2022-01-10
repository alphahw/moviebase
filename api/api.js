import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { transform, isArray, isObject, camelCase } from 'lodash-es'

function camelize(obj) {
  return transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    acc[camelKey] = isObject(value) ? camelize(value) : value;
  })
};

function normalizeResponseData(data) {
  if (!data) return;
  const normalizedData = camelize(data);
  if (normalizedData.response) {
    normalizedData.response = normalizedData.response === 'True';
  }
  return normalizedData;
}

const fetcher = (...args) => fetch(...args)
  .then(res => res.json())
  .then(data => normalizeResponseData(data))

const PAGE_LIMIT = 10;

const getMovieTitleKey = (pageIndex, previousPageData, title, shouldFetch) => {
  if (!shouldFetch || previousPageData && !previousPageData.response) return null // reached the end or should not fetch

  return `${process.env.NEXT_PUBLIC_OMDB_API_URL_AUTHED_BASE}&s=${title}&page=${pageIndex + 1}&type=movie`
}

export function useMovieTitle(title) {
  let shouldFetch = true;
  if (!title) {
    shouldFetch = false;
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (...args) => getMovieTitleKey(...args, title, shouldFetch),
    fetcher
  )

  const movies = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    (isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined"))
  const isEmpty = data?.[0]?.search?.length === 0

  const isReachingEnd =
    (isEmpty || (data && !data[data.length - 1]?.response))
  const isRefreshing = isValidating && data && data.length === size

  return {
    movies: movies,
    isIdle: !shouldFetch,
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
  }
}

export function useMovieImdbId(imdbId) {
  let shouldFetch = true;
  if (!imdbId) {
    shouldFetch = false;
  }

  const { data, error } = useSWR(
    shouldFetch ?
    `${process.env.NEXT_PUBLIC_OMDB_API_URL_AUTHED_BASE}&i=${imdbId}&type=movie&plot=full` :
    null,
    fetcher
  )

  return {
    movie: data,
    isIdle: !shouldFetch,
    isLoading: !error && !data,
    isError: error
  }
}