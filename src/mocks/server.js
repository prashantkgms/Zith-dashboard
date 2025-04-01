import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ users: [{ id: 1, name: 'John Doe' }] })
    );
  }),
];

export const server = setupServer(...handlers);
