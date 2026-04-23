const mineflayer = require('mineflayer')
const http = require('http')

// Render'ın "çalışıyor" görmesi için basit bir web sunucusu
http.createServer((req, res) => {
    res.write("POTETO24 AKTIF");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1',
        connectTimeout: 120000,
        checkTimeoutInterval: 120000
    })

    bot.on('login', () => console.log('Bot sunucuya çakıldı.'));

    bot.on('end', () => {
        // Atılırsa hemen (saniyesinde) geri gir
        createBot();
    });

    bot.on('error', (err) => {
        setTimeout(createBot, 2000);
    });
}
createBot()
