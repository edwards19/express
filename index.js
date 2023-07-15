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
	},
};

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', config.dir.views);

// do not identify Express
app.disable('x-powered-by');

console.dir(config, { depth: null, color: true });

app.use((req, res, next) => {
	console.log(req.url);
	next();
});

// HTTP compression
app.use(compression());

// home page route
app.get('/', (req, res) => {
	res.render('message', { title: 'Hello!' });
});

app.get('/hello/', (req, res) => {
	res.render( 'message', {title: 'Hello again!'});
});

app.use(express.static(config.dir.static));

// 404 error
app.use((req, res) => {
    res.render('message', { title: 'Not found!' });
})

// start server
app.listen(config.port, () => {
	console.log(`App listening at http://localhost:${config.port}`);
});

export { config, app };
