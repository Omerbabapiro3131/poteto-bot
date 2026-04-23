const mineflayer = require('mineflayer')
const http = require('http')

// 7/24 aktif kalması için küçük bir server
http.createServer((req, res) => {
    res.write("POTETO24 - 1.21.11 Aktif!");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1' // 1.21.11 sunucular için bu sürümü kullanmalısın
    })

    bot.on('login', () => console.log('POTETO24 (1.21.11) içeri daldı!'))
    
    bot.on('spawn', () => {
        // AFK kalıp atılmaması için 30 saniyede bir zıplama
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000)
    })

    bot.on('end', () => {
        console.log('Bağlantı koptu, 5 saniye sonra tekrar deniyor...');
        setTimeout(createBot, 5000)
    })

    bot.on('error', (err) => console.log('Hata:', err))
}

createBot()
