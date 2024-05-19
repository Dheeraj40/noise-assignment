const request = require('supertest');
const app = require('../app');
const connectDB = require('../db');

beforeAll(async() => {
    await connectDB();
});

let testRecordId;
describe('Test the /sleep endpoint', () => {
    
    test('It should respond to the POST method with valid data', async () => {
        const response = await request(app)
           .post('/sleep')
           .send({ userId: 1, hours: 8, timestamp: '2024-05-19T07:00:00.000Z' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            userId: "1",
            hours: 8,
            timestamp: '2024-05-19T07:00:00.000Z'
        }));
        testRecordId = response.body._id;
    })

    test('It should respond to the POST method with invalid data', async () => {
        const response = await request(app)
           .post('/sleep')
           .send({ userId: 1, hours: 8 });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Missing required fields' });
    })
});



describe('Test the /sleep/:userId endpoint', () => {
    test('It should retrieve a list of sleep records for a given user', async () => {
        const response = await request(app).get('/sleep/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                userId: "1",
            })
        ]));
    });
});

describe('Test the /sleep/:recordId endpoint', () => {
    test('It should delete a specific sleep record by its ID', async () => {
        const response = await request(app).delete(`/sleep/${testRecordId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            _id: testRecordId,
            success: true,
        }));
    });

    test('It should return 404 for deleting a non-existent record', async () => {
        const response = await request(app).delete(`/sleep/664a0736e53e13a899ccc5b0`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Record not found' });
    });
});
