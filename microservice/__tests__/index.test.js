const request = require('supertest');
const app = require('../index');

describe('Microservice API', () => {
  test('GET /health returns status OK', async () => {
    const res = await request(app).get('/health').timeout({ response: 5000, deadline: 10000 });
    expect(res.statusCode).toBe(200);
    // The expected response format: { status: 'OK', timestamp: <ISO string> }
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('POST /echo returns the same payload', async () => {
    const payload = { message: 'hello' };
    const res = await request(app)
      .post('/echo')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.youSent).toEqual(payload);
  });

  test('Unknown route returns 404', async () => {
    const res = await request(app).get('/nope');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });
});
