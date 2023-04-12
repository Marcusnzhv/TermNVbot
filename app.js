import express from 'express'
// import mongoose, { model, Schema } from 'mongoose'
import { PORT, TOKEN} from './config.js'
import { Telegraf } from 'telegraf'
import axios from 'axios'
import { lookingStreet } from './services.js'


const app = express()
const bot = new Telegraf(TOKEN)


bot.start(ctx => {
    ctx.replyWithHTML('<b>Welcome my friend</b>')
})
bot.on('text', async ctx => {
    ctx.state.mes = ctx.message.text
    let messageForBot = lookingStreet(ctx.state.mes) || '❗❗❗' + ctx.message.text
    await axios(`https://api.telegram.org/bot6261618326:AAFeM3yjZG78GL4YJTOxJ7pAFvh7Jpy74-g/sendMessage?chat_id=1414224565&text=${messageForBot}`)
})
bot.launch()

// mongoose.connect(dbMongo, { useNewUrlParser: true, useUnifiedTopology: true })
// const schema = new Schema({ street: 'string', color: 'string', num: 'number' })
// const Adress = model('Adress', schema)
// // const adress = new Adress({ street: 'омская', color: '🟢', num: 44 })
// // adress.save()
// console.log(Adress.collection('adresses').find({ num: 54 }))


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
