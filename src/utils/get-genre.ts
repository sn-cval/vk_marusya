type GenreKey =
  | 'history'
  | 'horror'
  | 'scifi'
  | 'stand-up'
  | 'fantasy'
  | 'drama'
  | 'mystery'
  | 'family'
  | 'comedy'
  | 'romance'
  | 'music'
  | 'crime'
  | 'tv-movie'
  | 'documentary'
  | 'action'
  | 'thriller'
  | 'western'
  | 'animation'
  | 'war'
  | 'adventure'

const genres: Record<GenreKey, string> = {
  history: 'Историческое',
  horror: 'Ужасы',
  scifi: 'Научная фантастика',
  'stand-up': 'Стендап',
  fantasy: 'Фантастика',
  drama: 'Драма',
  mystery: 'Мистика',
  family: 'Семейное',
  comedy: 'Комедия',
  romance: 'Романтика',
  music: 'Музыка',
  crime: 'Криминал',
  'tv-movie': 'ТВ-шоу',
  documentary: 'Документальное',
  action: 'Боевик',
  thriller: 'Триллер',
  western: 'Вестерн',
  animation: 'Анимационное',
  war: 'Военное',
  adventure: 'Приключения',
}

function isGenreKey(key: string): key is GenreKey {
  return key in genres
}

export function getGenreMovies(item: string): string {
  if (!isGenreKey(item)) {
    return 'Другое'
  }
  return genres[item]
}
