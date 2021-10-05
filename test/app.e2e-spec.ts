import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PokemonCreateDto } from 'src/pokemon/pokemon_create.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/pokemon (GET) success', () => {
    return request(app.getHttpServer()).get('/pokemon').expect(200);
  });

  it('/pokemon (POST)', () => {
    const postedPokemon: PokemonCreateDto = {
      id: 19,
      name: 'Tortank',
      height: 100,
      weight: 200,
    };
    return request(app.getHttpServer())
      .post('/pokemon')
      .send(postedPokemon)
      .expect(201);
  });
});
