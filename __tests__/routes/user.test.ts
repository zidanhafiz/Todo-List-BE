import request from 'supertest';
import app from '../../src/index';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

describe('GET /users', () => {
  test('Should return all users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .set('Cookie', REFRESH_TOKEN);
    return expect(res.statusCode).toBe(200);
  });

  test('Should return unauthorize', async () => {
    const res = await request(app).get('/users');
    return expect(res.statusCode).toBe(401);
  });
});

describe('GET /users/:id', () => {
  const id = 'ab766204-e1c9-44bd-a9f4-ec8f6c94ef6a';
  test('Should return user with specific id', async () => {
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Cookie', REFRESH_TOKEN)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    return expect(res.statusCode).toBe(200);
  });
  test('Should return user not found', async () => {
    const res = await request(app)
      .get(`/users/xx123`)
      .set('Cookie', REFRESH_TOKEN)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    return expect(res.statusCode).toBe(404);
  });
  test('Should return unauthorize', async () => {
    const res = await request(app).get(`/users/${id}`);
    return expect(res.statusCode).toBe(401);
  });
});
