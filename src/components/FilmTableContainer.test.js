import { render, screen, fireEvent } from '@testing-library/react';

import FilmTableContainer from './FilmTableContainer';

const films = [
  {
    id: 135397,
    overview: 'case word substring',
    release_date: '2015-10-02',
    poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
    title: 'The Title',
    vote_average: 6.9,
  },
  {
    id: 286217,
    overview: 'Case',
    release_date: '2014-06-12',
    poster_path: '/AjbENYG3b8lhYSkdrWwlhVLRPKR.jpg',
    title: 'Word',
    vote_average: 7.7,
  },
];

describe('FilmTableContainer', () => {
  describe('Filters film by case keyword', () => {
    test('Empty string does not filter films', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm=""
          sortType="title"
          setRatingFor={jest.fn}
        />
      );

      expect(screen.queryByText(films[0].title)).toBeDefined();
      expect(screen.queryByText(films[1].title)).toBeDefined();
    });

    test('Any substring satisfies the filter', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm="sub"
          sortType="title"
          setRatingFor={jest.fn}
        />
      );

      expect(screen.queryByText(films[0].title)).toBeDefined();
      expect(screen.queryByText(films[1].title)).toBeNull();
    });

    test('Keyword is case insensitive', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm="Case"
          sortType="title"
          setRatingFor={jest.fn}
        />
      );

      expect(screen.queryByText(films[0].title)).toBeDefined();
      expect(screen.queryByText(films[1].title)).toBeDefined();
    });

    test('Title and overview are tested', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm="word"
          sortType="title"
          setRatingFor={jest.fn}
        />
      );

      expect(screen.queryByText(films[0].title)).toBeDefined();
      expect(screen.queryByText(films[1].title)).toBeDefined();
    });
  });

  describe('Sorts films by property', () => {
    test('Sorts by title', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm="word"
          sortType="title"
          setRatingFor={jest.fn}
        />
      );
      const items = screen
        .queryAllByRole('heading')
        .map((item) => item.textContent);

      expect(items).toEqual([films[0].title, films[1].title]);
    });

    test('Sorts by year of release_date', () => {
      render(
        <FilmTableContainer
          films={films}
          searchTerm="word"
          sortType="release_date"
          setRatingFor={jest.fn}
        />
      );
      const items = screen
        .queryAllByRole('heading')
        .map((item) => item.textContent);

      expect(items).toEqual([films[1].title, films[0].title]);
    });
  });
});
