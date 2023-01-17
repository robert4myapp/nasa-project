const request = require('supertest');
require('dotenv').config();
const app = require('../../app.js');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo');
const mongoose = require('mongoose');



const MONGO_URL = process.env.MONGO_URL;

describe('Launches API Test', () => {
    beforeAll(async ()=> {
    await mongoConnect();
    });
    // afterAll(async ()=>{
    //     await mongoDisconnect();
    // });
    describe('Test Get/launches', () => {
        test('Should respond with 200 success', async () => {
            const response = await request(app).get('/v1/launches').expect('Content-Type', /json/).expect(200);
        });
    });
    describe('Test Post/launches', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise', rocket: 'NCC 1701-D', target: 'Kepler-62 f', launchDate: 'January 4, 2028',
        };

        const launchDataWithoutDate = {
            mission: 'USS Enterprise', rocket: 'NCC 1701-D', target: 'Kepler-62 f',
        };

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise', rocket: 'NCC 1701-D', target: 'Kepler-62 f', launchDate: 'zoot',
        };
        test('Should respond with 201 created', async () => {
            const response = await request(app).post('/v1/launches').send(completeLaunchData).expect('Content-Type', /json/).expect(201);
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        test('Should respond catch missing required properties', async () => {
            const response = await request(app).post('/v1/launches').send(launchDataWithoutDate).expect('Content-Type', /json/).expect(400);
            expect(response.body).toStrictEqual({
                error: 'Missing Data Field'
            });
        });
        test('Should respond catch invalid dates', async () => {
            const response = await request(app).post('/v1/launches').send(launchDataWithInvalidDate).expect('Content-Type', /json/).expect(400);
            expect(response.body).toStrictEqual({
                error: 'Invalid Launch Date',
            });
        });
    });
});
