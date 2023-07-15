import express from 'express';

const app = express();
const config = {
	port: process.env.PORT || 3000,
};

// home page route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/hello/', (req, res) => {
    res.send('Hello again!')
})

// start server
app.listen(config.port, () => {
	console.log(`App listening at http://localhost:${config.port}`);
});
