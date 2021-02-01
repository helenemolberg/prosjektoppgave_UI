const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('POST /api/v1/pictures', () => {
  it('responds with inserted data without picture', (done) =>{
    const requestObj = {
      latitude: -90,
      longitude: 180,
      prosjekt: 'E6KAA',
      omradeProsjekt: 'Holvegen',
      parsell: 1000,
      orienteringBilde: 65.525,
      dato: '2021-01-18',
      kategori: 'VVS'
    };
    request(app)
      .post('/api/v1/pictures')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response);
        done();
      });
  });
});
