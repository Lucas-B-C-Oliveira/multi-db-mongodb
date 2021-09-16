const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._heroes = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]

        if(state === 'Connected') return state

        if(state === '!Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    defineModel() {

        const heroSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._heroes = Mongoose.model('heroes', heroSchema)
    }

    connect() {
        Mongoose.connect('mongodb://lucasbcoliveira:minhasenhasecreta@localhost:27017/heroes',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Connection fail! ', error)
            })

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('database running!!'))
        this.defineModel()

    }

    create(item) {
        return this._heroes.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._heroes.find(item).skip(skip).limit(limit)
    }
}

module.exports = MongoDB