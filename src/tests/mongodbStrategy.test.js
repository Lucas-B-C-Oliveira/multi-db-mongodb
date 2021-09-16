const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
    name: 'Hercules',
    power: 'Strong'
}

const MOCK_HERO_DEFAULT = {
    name: `Spiderman-${Date.now()}`,
    power: 'Super Web'
}

const context = new Context(new MongoDb)

describe('MongoDB Test Suite', function () {

    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HERO_DEFAULT)
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

    it ('listar', async () => {
        const [{ name, power }] = await context.read({ name: MOCK_HERO_DEFAULT.name })
        const result = {
            name, power
        }
        assert.deepStrictEqual(result, MOCK_HERO_DEFAULT)
    })
} )