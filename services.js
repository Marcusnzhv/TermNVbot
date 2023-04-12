import { streets, strangesStreets } from "./listOfAdresses.js"


//let message_1 = 'г.Нижневартовск, ул. Омская, д. 25, м-н "Пивко", (10:00-23:00) неисправность'
//let message_1 = 'г.Нижневартовск, пр-д Заозерный, д. 4 А, м-н «Апрель», (24 ч.) Неисправность'
const lookingStreet = (msg) => {
    for (let i = 0; i < streets.length; i++) {
        let tempMesg = msg.split(' ').join('').toLocaleLowerCase()
        let ourStreet = streets[i].street.split(' ').join('').toLocaleLowerCase()
        let result = tempMesg.includes(ourStreet)
        let appNum = msg.slice(msg.indexOf('д.') + 2, msg.indexOf('д.') + 5).trim()
        let color = ''
        if (result) {
            if (streets[i].street == 'Омская') {
                switch (appNum) {
                    case '25':
                        color = '🟡'
                        break;
                    case '26' || '10':
                        color = '🔴'
                        break;
                    case '43':
                        color = '⚫️'
                        break;
                    default:
                        color = 'NONE'
                        break;
                }
            }
            color = color || streets[i].color
            const resultMsg = {
                'num': streets[i].num,
                'adress': (streets[i].street != 'Заозерный' || streets[i].street != 'Заозёрный') ? `ул. ${streets[i].street}` : `пр-д. ${streets[i].street}`,
                'tailMsg': msg.slice(msg.indexOf('д.'))
            }
            return `${resultMsg.num} ${color} ${resultMsg.adress}, ${resultMsg.tailMsg}`
        }
    }
}



export { lookingStreet }