import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Shorten e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /shorten — успешное создание', async () => {
    const dto = {
      originalUrl: 'https://example.com',
      alias: 'test-alias',
      expiresAt: new Date(Date.now() + 86400000).toISOString()
    };
  
    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send(dto)
      .expect(201); // или 200, если у вас так настроено
  
    expect(response.body).toHaveProperty('shortUrl');
    expect(response.body.originalUrl).toBe(dto.originalUrl);
  });

  it('POST /shorten — ошибка при невалидном URL', async () => {
    const dto = {
      originalUrl: 'not-a-url',
      alias: 'test'
    };
  
    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send(dto)
      .expect(400);
  
    expect(response.body.message).toBeDefined();
  });

  it('POST /shorten — ошибка при слишком длинном алиасе', async () => {
    const dto = {
      originalUrl: 'https://example.com',
      alias: 'testaliaslongerthan20symbols'
    };
  
    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send(dto)
      .expect(400);
  
    expect(response.body.message).toBeDefined();
  });

  it('GET /:shortUrl — редиректит на оригинальный URL', async () => {
    const createDto = {
      originalUrl: 'https://google.com',
    };
  
    const createRes = await request(app.getHttpServer())
      .post('/shorten')
      .send(createDto)
      .expect(201);
  
    const { shortUrl } = createRes.body;
    const res = await request(app.getHttpServer())
      .get(`/${shortUrl}`)
      .expect(302);
      
    expect(res.header.location).toBe(createDto.originalUrl);
  });

});