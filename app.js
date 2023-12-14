var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

// Pré-renderização EJS
function renderEJS(file) {
    const viewsDir = path.join(__dirname, 'views');
    const publicDir = path.join(__dirname, 'public');
    const filePath = path.join(viewsDir, `${file}.ejs`);
    const ejsContent = fs.readFileSync(filePath, 'utf8');
    const rendered = ejs.render(ejsContent, /* Seu contexto de dados, se necessário */);
    const htmlPath = path.join(publicDir, `${file}.html`);
    fs.writeFileSync(htmlPath, rendered);
}

// Renderizar todas as views EJS
renderEJS('index');
renderEJS('guia');
renderEJS('time');
renderEJS('buymeacoffe');
renderEJS('novidades');

// view engine setup
app.set('views', path.join(__dirname, 'public')); // Alterando para o diretório 'public' para servir os arquivos HTML pré-renderizados
app.set('view engine', 'html'); // Alterando para 'html' para usar os arquivos HTML pré-renderizados

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS CRIADAS
var indexRouter = require('./routes/index');
var guiaRouter = require('./routes/guia');
var timeRouter = require('./routes/time');
var buymeRouter = require('./routes/buymeacoffe');
var novidadesRouter = require('./routes/novidades');

app.use('/', indexRouter);
app.use('/guia', guiaRouter);
app.use('/time', timeRouter);
app.use('/buymeacoffe', buymeRouter);
app.use('/novidades', novidadesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
