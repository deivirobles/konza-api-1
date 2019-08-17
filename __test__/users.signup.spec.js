const request = require('supertest');

const server = require('./simple-server');

describe('Users', () => {
  test('GET List of Users', (done) => {
    request(server)
      .get('/api/users')
      .expect((res) => {
        const { body } = res;
        expect(body.success).toBeTruthy();
      })
      .expect(200, done);
  });
});
