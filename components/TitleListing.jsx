import Link from 'next/link'

export default function TitleListing({ className, movie }) {
  return (
    <li
      className={className}
    >
      <Link
        href={`/title/${encodeURIComponent(movie.imdbId)}`}
        prefetch={false}
      >
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-6xl font-bold break-words">{movie.title}</h2>
          <p className="text-xl lg:text-2xl text-slate-500">
            <span className="visually-hidden">Year </span>{movie.year}
          </p>
        </div>
      </Link>
    </li>
  )
}
