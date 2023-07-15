import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const app = express();
const config = {
	port: process.env.PORT || 3000,
	dir: {
		root: __dirname,
		static: __dirname + 'static' + sep,
		views: __dirname + 'views' + sep,
		routes: __dirname + 'routes' + sep,
	},
};

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', config.dir.views);

// do not identify Express
app.disable('x-powered-by');

console.dir(config, { depth: null, color: true });

app.get('/author/:authorName/book/:bookName', (req, res, next) => {
	console.log(req.params.authorName);
	console.log(req.params.bookName);
	res.send('Author name and book query');
    next();
});

app.use((req, res, next) => {
	console.log(req.url);
	next();
});

// HTTP compression
app.use(compression());

// home page route
app.get('/', (req, res) => {
	res.render('message', { title: 'Hello World!' });
});

// /hello/ route
import { helloRouter } from './routes/hello.js';
// app.use() defines the helloRouter middleware rather than a single app.get() route.
app.use('/hello', helloRouter);

app.use(express.static(config.dir.static));

console.log('static here', config.dir.static)

// 404 error
app.use((req, res) => {
	res.render('message', { title: 'Not found!' });
});

// start server
app.listen(config.port, () => {
	console.log(`App listening at http://localhost:${config.port}`);
});

export { config, app };
