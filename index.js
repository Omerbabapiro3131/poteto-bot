const mineflayer = require('mineflayer')
const http = require('http')

// Render'ın kapanmasını engelleyen küçük web sunucusu
http.createServer((req, res) => {
    res.write("POTETO24 Aktif!");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1',
        checkTimeoutInterval: 60000 // Zaman aşımı süresini artırır
    })

    bot.on('login', () => {
        console.log('POTETO24 içeri daldı!')
    })

    // Botun sunucuda kalması için arada bir zıplamasını sağlar
    bot.on('spawn', () => {
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000) // 30 saniyede bir zıplar
    })

    bot.on('end', () => {
        console.log('Bağlantı koptu, 5 saniye sonra tekrar deniyor...')
        setTimeout(createBot, 5000)
    })

    bot.on('error', (err) => console.log('Hata:', err))
}

createBot()
