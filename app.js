var app = require('./config/server');

var porta = process.env.PORT || 80;

app.listen(porta, function(){
	console.log('Servidor online - ' +  porta);
})