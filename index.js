const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.11'
    })

    bot.on('login', () => console.log('POTETO24 içeri daldı!'))
    bot.on('end', () => {
        console.log('Bağlantı koptu, 5 saniye sonra tekrar deniyor...');
        setTimeout(createBot, 5000)
    })
    bot.on('error', (err) => console.log('Hata:', err))
}
createBot()
