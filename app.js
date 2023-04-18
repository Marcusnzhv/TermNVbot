import express from 'express'
import { PORT, TOKEN } from './config.js'
import { Telegraf } from 'telegraf'
import axios from 'axios'
import mongoose, { model, Schema } from 'mongoose'
import { dbURI } from './config.js'
import { handelMessage } from './services.js'


const app = express()
const bot = new Telegraf(TOKEN)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

bot.start(ctx => {
    ctx.replyWithHTML('<b>Welcome my friend</b>')
})

const schemaStreet = new Schema({
    street: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    app: {
        type: String,
        required: false
    },
    shortName: {
        type: String,
        required: true
    }
})

const Adress = model('Adress', schemaStreet)

bot.on('text', async ctx => {
    ctx.state.mes = ctx.message.text
    const findAdressDB = async (street, app, tail) => {
        let result = await Adress.findOne({ shortName: street }).where((street == 'омская') ? { app: app } : {}).exec()
            .then(async doc => {
                let msg = `${doc.num} ${doc.color} ${doc.street} ${tail}`
                await sendMsg(msg)
            })
    }
    if (!handelMessage(ctx.state.mes)) {
        sendMsg('❗❗❗' + ctx.state.mes)
    } else {
        let adress = handelMessage(ctx.state.mes)
        findAdressDB(adress.street, adress.app, adress.tailMsg)
    }
})

const sendMsg = async (msg) => {
    await axios(`https://api.telegram.org/bot6261618326:AAFeM3yjZG78GL4YJTOxJ7pAFvh7Jpy74-g/sendMessage?chat_id=1414224565&text=${msg}`)
}

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
