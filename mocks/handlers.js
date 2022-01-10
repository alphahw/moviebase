import { rest } from 'msw'
import data from './data'

console.log(data)

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_OMDB_API_URL_BASE}`, (req, res, ctx) => {
    let resJson;

    const imdbId = req.url.searchParams.get('i');
    const title = req.url.searchParams.get('s');
    const page = req.url.searchParams.get('page');

    if (imdbId) {
      resJson = data.useMovieImdbId[imdbId];
    }

    if (title && page) {
      resJson = data.useMovieTitle[title][parseInt(page, 10) - 1]; 
    }

    return res(
      ctx.status(200),
      ctx.json(resJson),
    )
  })
]