const request = require('supertest');

const server = require('./simple-server');

describe('Users', () => {
  test('GET List of Users', async () => {
    const res = await request(server).get('/api/users');
    const { body } = res;
    expect(body.success).toBeTruthy();
  });
});
