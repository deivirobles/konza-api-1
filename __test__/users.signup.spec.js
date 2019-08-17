const request = require('supertest');

const server = require('./../server');
const config = require('./../server/config');
const database = require('./../server/database');

let agent;

beforeAll(() => {
  const url = `${config.database.url}-test`;
  database.connect({ url }, {});

  agent = request(server);
});

afterAll(() => {
  database.disconnect();
});

describe('Users', () => {
  test('Cannot GET List of Users if the user is not authenticated', async () => {
    const res = await agent.get('/api/users');
    expect(res.status).toBe(401);
  });
});
