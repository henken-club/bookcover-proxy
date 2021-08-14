import got from 'got';

export const openbd = (isbn: string) =>
  got
    .get('https://api.openbd.jp/v1/get', {searchParams: {isbn}})
    .json<[null | {summary: {cover?: string}}]>()
    .then((result) => result[0]?.summary.cover)
    .then((result) =>
      result
        ? Promise.resolve({url: result, source: 'openbd'})
        : Promise.reject(),
    );
