import fastify from 'fastify';

import {openbd} from './openbd';

const server = fastify({logger: true});

server.get<{Params: {isbn: string}}>('/isbn/:isbn', async (request, reply) => {
  const {isbn} = request.params;

  const source = await Promise.any([openbd(isbn)]).catch(() => null);
  if (!source) reply.callNotFound();
  return source;
});

server.listen(
  // eslint-disable-next-line no-process-env
  process.env.PORT!,
  '0.0.0.0',
  (error, address) => {
    if (error) throw error;
    server.log.info(`server listening on ${address}`);
  },
);
