import { Router } from 'express';
import { goodbye } from '../lib/locales.js';
import { capitalize } from '../lib/string.js';

export const goodbyeRouter = Router();

goodbyeRouter.get('/:name', (req, res) => {
	res.render('message', { title: `${goodbye.en} ${capitalize(req.params.name)}` });
});

goodbyeRouter.get('/:lang/:name', (req, res) => {
	res.render('message', { title: `${goodbye[req.params.lang] || goodbye.en} ${capitalize(req.params.name)}` });
});
