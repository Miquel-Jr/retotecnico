module.exports = {
    tables: [
        {
            TableName: 'dev-retotecnico-vehicle',
            KeySchema: [
                {
                    AttributeName: 'ID',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'ID',
                    AttributeType: 'N',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};