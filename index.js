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
	},
};

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
	res.send('Hello World!');
});

app.get('/hello/', (req, res) => {
	res.send('Hello again!');
});

app.use(express.static(config.dir.static));

// 404 error
app.use((req, res) => {
    res.status(404).send('Not found');
})

// start server
app.listen(config.port, () => {
	console.log(`App listening at http://localhost:${config.port}`);
});

export { config, app };
