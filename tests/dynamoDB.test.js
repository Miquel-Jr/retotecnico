const Dynamo = require('../libs/DynamoDB');
const { test, expect} = require('@jest/globals');

test('Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object');
});

test('dynamo has get, write and scanAll', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
    expect(typeof Dynamo.scanAll).toBe('function');
});
/*
const validTableName = 'dev-retotecnico-vehicle';
const data = {
    ID: 1,
    placa: "AWS-121",
    color: "ROJO",
    VehicleStatus: "ACTIVE",
    creationDate: "2023-07-13 10:23:23",
    updateDate: "2023-07-13 10:23:23"
};


test('Dynamo write works', async () => {
    try {
        const res = await Dynamo.write(data, validTableName);
        expect(res).toBe(data);
    } catch (error) {
        console.log('error in dynamo write test', error);
    }
});

test('dynamo get works', async () => {
    try {
        const res = await Dynamo.get(data.ID, validTableName);
        expect(res).toEqual(data);
    } catch (error) {
        console.log('error in dynamo get test', error);
    }
});

test('Dynamo scan all works', async () => {
    try {
        const res = await Dynamo.scanAll(validTableName);
        expect(res).toBe([data]);
    } catch (error) {
        console.log('error in dynamo scan all test', error);
    }
});*/