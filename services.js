const arrNameStreets = ['ул', 'пр-д', 'проспект']
const findNameStreet = (msg, arrNameStreets) => {
    let par = ''
    arrNameStreets.forEach(el => {
        if (msg.includes(el)) {
            par = el
        }
    })
    return par || false
}

const handelMessage = (msg) => {
    let adress = {}
    let paramSearch = findNameStreet(msg, arrNameStreets)
    if (!paramSearch) return false
    adress.street = msg.split(paramSearch)[1].split(',')[0].toLowerCase().replace(/[^А-я ]/, " ").trim().split(' ').join('')
    adress.app = msg.split('д.')[1].split(',')[0].trim()
    adress.tailMsg = msg.slice(msg.indexOf('д.'))
    return adress
}

export { handelMessage }