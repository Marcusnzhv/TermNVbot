import express from 'express'
import { PORT, TOKEN, TOKENIncomingBot, IDChatIncomingBot } from './config.js'
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
    // const findAdressDB = async (street, app, tail) => {
    //     let result = await Adress.findOne({ shortName: street }).where((street == 'омская') ? { app: app } : {}).exec()
    //         .then(async doc => {
    //             let msg = `${doc.num} ${doc.color} ${doc.street} ${tail}`
    //             await sendMsg(msg)
    //         })
    // }
    const findAddress = async (street, app, tail) => {
        try {
            let query = { shortName: street }
            if (street === 'омская') {
                query.app = app
            }
            const doc = await Adress.findOne(query).exec()
            if (!doc) {
                throw new Error('Адрес не найден')
            }
            const msg = `${doc.num} ${doc.color} ${doc.street} ${tail}`
            await sendMsg(msg)
        } catch (error) {
            console.error(error)
        }
    }
    if (!handelMessage(ctx.state.mes)) {
        sendMsg('❗❗❗' + ctx.state.mes)
    } else {
        let adress = handelMessage(ctx.state.mes)
        findAddress(adress.street, adress.app, adress.tailMsg)
    }
})

const sendMsg = async (msg) => {
    try {
        await axios(`https://api.telegram.org/bot${TOKENIncomingBot}/sendMessage?chat_id=${IDChatIncomingBot}&text=${msg}`)
    } catch (error) {
        console.error(error)
    }

}

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
