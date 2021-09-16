const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
    name: 'Hercules',
    power: 'Strong'
}

const context = new Context(new MongoDb)

describe('MongoDB Test Suite', function () {

    this.beforeAll(async () => {
        await context.connect()
    })

    it('Check connection', async () => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Connected'

        assert.deepStrictEqual(result, expected)
    })

    it('register', async () => {
        const { name, power } = await context.create(MOCK_HERO_REGISTER)
        assert.deepStrictEqual({ name, power }, MOCK_HERO_REGISTER)
    })
} )