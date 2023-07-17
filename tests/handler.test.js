require('./init')
const eventGenerator = require('../libs/eventGenerator');
const validators = require('../libs/validators');
const handler = require('../src/handler');

const { describe, test, expect} = require('@jest/globals');

describe('get fimls integrations tests', () => {

    test('return an API Gateway response', async () => {
        const res = await handler.films();
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

});

describe('get planets integrations tests', () => {

    test('return an API Gateway response', async () => {
        const res = await handler.planets();
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })

});

describe('create vehicle integration tests', () => {
    const data = {
        ID: 1,
        placa: "AWS-121",
        color: "VERDE",
        VehicleStatus: "ACTIVE",
        creationDate: "2023-07-13 10:23:23",
        updateDate: "2023-07-13 10:23:23"
    };
    test('it shoudl take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: data,
        });

        const res = await handler.vehicleRegister(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return a 200 if the vehicle data is valid', async () => {

        const event = eventGenerator({
            body: data,
        });
        const res = await handler.vehicleRegister(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.success).toEqual(true);
    });

    test("it should return 400 if we don't pass any or any parameter", async () => {
        const event = eventGenerator({});
        const res = await handler.vehicleID(event);
        expect(res.statusCode).toBe(400);
    });
});

describe('get vehicle ID integrations tests', () => {

    test('return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
                ID: 1
            },
        });
        const res = await handler.vehicleID(event);
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })

    test('it should return 400 if we dont pass an ID', async () => {
        const event = eventGenerator({});
        const res = await handler.vehicleID(event);
        expect(res.statusCode).toBe(400);
    });

});

describe('get vehicle All integrations tests', () => {

    test('return an API Gateway response', async () => {
        const res = await handler.vehicleAll();
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

    test('it should return 200', async () => {
        const res = await handler.vehicleAll();
        expect(res.statusCode).toBe(200);
    });

});



