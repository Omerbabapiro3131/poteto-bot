const mineflayer = require('mineflayer')
const http = require('http')

// Replit'in botu "bozuk" sanıp resetlemesini engellemek için sahte server
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("POTETO24_ONLINE");
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potetosmp11.aternos.me',
        port: 58682,
        username: 'POTETO24',
        version: '1.21.1',
        // Sunucu lag yaparsa hemen düşmemesi için limitleri kökle
        connectTimeout: 120000,
        checkTimeoutInterval: 120000
    })

    bot.on('login', () => console.log('POTETO24 içeri daldı ve sabitlendi.'));

    bot.on('end', () => {
        // Atıldığı an (0 saniye bekleme) geri girmeye çalışır
        createBot();
    });

    // Hata verse bile kodu durdurma, devam et
    bot.on('error', (err) => {
        console.log('Bağlantı hatası, tekrar deneniyor...');
        setTimeout(createBot, 1000);
    });
}

createBot()
