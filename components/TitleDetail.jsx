function BadgeItem({ children }) {
  return <li
    
    className="inline-block mr-1 mb-1 py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-600 text-white rounded"
  >{children}</li>
}

export default function TitleDetail({ className, movie }) {
  const keys = ['genre', 'director', 'writer', 'actors', 'language', 'Country'];
  keys.forEach(key => {
    let val = movie[key]
    if (val && !Array.isArray(val)) {
      movie[key] = movie[key].split(',').map((val) => val.trim())
    }
  })

  const genres = movie.genre;
  const genreItems = genres.map((genre) =>
    <BadgeItem key={genre.toString()}>
      {genre}
    </BadgeItem>
  );

  const directors = movie.director;
  const directorItems = directors.map((director) =>
    <BadgeItem key={director.toString()}>
      {director}
    </BadgeItem>
  );

  const writers = movie.writer;
  const writerItems = writers.map((writer) =>
    <BadgeItem key={writer.toString()}>
      {writer}
    </BadgeItem>
  );

  const actors = movie.actors;
  const actorsItems = actors.map((actor) =>
    <BadgeItem key={actor.toString()}>
      {actor}
    </BadgeItem>
  );

  const languages = movie.language;
  const languageItems = languages.map((language) =>
    <BadgeItem key={language.toString()}>
      {language}
    </BadgeItem>
  );

  return (
    <div className={'space-y-2 ' + className}>
      <h1
        className="text-3xl lg:text-6xl font-bold grow shrink-0"
        data-test-movie-title
      >{movie.title}</h1>

      <dl className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="space-y-2 lg:col-span-2">
          <div>
            <dt className="visually-hidden">
              Year
            </dt>
            <dd>
              <h3 className="text-xl lg:text-2xl text-slate-500">{movie.year}</h3>
            </dd>
          </div>

          <h2>{movie.plot}</h2>
        </div>

        <div className="space-y-2">
          <h3>Released on <strong>{movie.released}</strong></h3>

          <div>
            <dt>
              Runtime
            </dt>
            <dd>
              <h3>{movie.runtime}</h3>
            </dd>
          </div>

          <div>
            <dt>
              <h3>Genre</h3>
            </dt>
            <dd>
              <ul className="flex flex-wrap">
                {genreItems}
              </ul>
            </dd>
          </div>

          <div>
            <dt>
              <h3>Language</h3>
            </dt>
            <dd>
              <ul className="flex flex-wrap">
                {languageItems}
              </ul>
            </dd>
          </div>

          <div>
            <dt>
              <h3>Director</h3>
            </dt>
            <dd>
              <ul className="flex flex-wrap">
                {directorItems}
              </ul>
            </dd>
          </div>

          <div>
            <dt>
              <h3>Actors</h3>
            </dt>
            <dd>
              <ul className="flex flex-wrap">
                {actorsItems}
              </ul>
            </dd>
          </div>
        </div>

      </dl>
    </div>
  )
}
