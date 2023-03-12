import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { config } from '../config';

const handlers = [
  // @ts-ignore
  rest.post(`${config.api}/auth/logout`, (req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
