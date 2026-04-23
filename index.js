const mineflayer = require('mineflayer')
const http = require('http')

// Portu dinle ama botu etkileme
http.createServer((req, res) => {
    res.end("POTETO24 CALISIYOR");
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1',
        connectTimeout: 60000, // Bağlanma süresini uzat
        checkTimeoutInterval: 90000 // Sunucu yanıt vermezse hemen çıkma
    })

    bot.on('login', () => console.log('POTETO24 içeri daldı!'))
    
    bot.on('spawn', () => {
        console.log('Bot doğdu, zıplama aktif.');
        // Çok sık zıplamasın, 1 dakikada bir yeterli
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 60000)
    })

    bot.on('end', (reason) => {
        console.log('Bağlantı koptu, sebep:', reason);
        // Hemen girmeye çalışmasın, 10 saniye bekle
        setTimeout(createBot, 10000)
    })

    bot.on('error', (err) => console.log('Hata:', err))
}

createBot()
