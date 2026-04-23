const mineflayer = require('mineflayer')
const http = require('http')

// Replit'in projeyi kapatmaması için şart
http.createServer((req, res) => {
    res.end("POTETO24 Arka Planda Aktif");
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1',
        // Sunucuyla olan bağlantı kontrolünü gevşetelim ki durduk yere atmasın
        checkTimeoutInterval: 120000 
    })

    bot.on('login', () => console.log('POTETO24 sessizce girdi.'))

    bot.on('end', (reason) => {
        console.log('Bağlantı koptu, 10 saniye sonra tekrar deniyor...');
        setTimeout(createBot, 10000)
    })

    bot.on('error', (err) => console.log('Hata oluştu:', err))
}

createBot()
