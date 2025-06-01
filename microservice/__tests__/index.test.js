// File: __tests__/index.test.js

const request = require('supertest');
const app = require('../index'); // Import the Express app

describe('Express Microservice Integration Tests', () => {
  // Increase Jest default timeout if your environment is slow
  jest.setTimeout(10000);

  test('GET /health → 200, returns { status: "OK", timestamp: Number }', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(typeof response.body.timestamp).toBe('number');
  });

  test('GET /health with query params → 200, ignores query params', async () => {
    const response = await request(app).get('/health?foo=bar&baz=123');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(typeof response.body.timestamp).toBe('number');
  });

  test('POST /echo → 200, returns { youSent: <same body> }', async () => {
    const payload = { foo: 'bar', num: 123 };
    const response = await request(app)
      .post('/echo')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('youSent');
    expect(response.body.youSent).toEqual(payload);
  });

  test('POST /echo with empty body → 200, returns empty object', async () => {
    // If no JSON body sent, bodyParser.json() yields {}
    const response = await request(app)
      .post('/echo')
      .send({})
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('youSent');
    expect(response.body.youSent).toEqual({});
  });

  test('POST /echo with nested object → 200, returns nested object', async () => {
    const nestedPayload = {
      level1: {
        level2: {
          text: 'hello',
          arr: [1, { a: 'b' }, 3]
        }
      }
    };
    const response = await request(app)
      .post('/echo')
      .send(nestedPayload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('youSent');
    expect(response.body.youSent).toEqual(nestedPayload);
  });

  test('GET /does-not-exist → 404, returns { error: "Not Found" }', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });

  test('POST /does-not-exist → 404, returns { error: "Not Found" }', async () => {
    const response = await request(app)
      .post('/does-not-exist')
      .send({ foo: 'bar' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});
