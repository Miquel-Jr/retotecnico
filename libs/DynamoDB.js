const AWS = require('aws-sdk');

let options = {};
const isOffline = process.env.IS_OFFLINE
if (isOffline) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}
const isTest = process.env.JEST_WORKER_ID;
if (isTest) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }

        return data.Item;
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }

        return data;
    },

    async scanAll(TableName) {
        const params = {
            TableName
        };

        let evaluatedKey = undefined
        let items = []
        do {
            if (evaluatedKey != undefined) {
                params.ExclusiveStartKey = evaluatedKey;
            }
            const resultData = await this.scanTable(params);
            evaluatedKey = resultData[0]
            const itemsData = resultData[1]
            items = items.concat(itemsData);
        } while (evaluatedKey);

        return items;
    },

    async scanTable(params) {
        const result = await documentClient.scan(params).promise();
        if (!result.Items) {
            return [ undefined, []]
        }
        const data = result.Items
        const evaluatedKey = result.LastEvaluatedKey
        return [ evaluatedKey , data ]
    }
};
module.exports = Dynamo;