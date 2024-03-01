const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

const passport = require('./config/passport_config')

const authRouter = require('./routes/auth.router');
const projectRouter = require('./routes/project.router')
const bugRouter = require('./routes/bug.router')
const developerRouter = require('./routes/developer.router')
const questionRouter = require('./routes/question.router')

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL
const frontendURL = process.env.FRONTEND_URL

const app = express();
app.use(cors({
	allowedHeaders: [
		'X-ACCESS_TOKEN',
		'Access-Control-Allow-Origin',
		'Authorization',
		'Origin',
		'x-requested-with',
		'Content-Type',
		'Content-Range',
		'Content-Disposition',
		'Content-Description',
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: [
		frontendURL,
		'http://localhost:3000',
	],
	preflightContinue: false,
}))

mongoose.connect('mongodb://127.0.0.1:27017/spider-bug-tracker');
console.log("------")
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use(
	'/api/v1/projects',
	passport.authenticate('developer', { session: false }),
	projectRouter
)
app.use(
	'/api/v1/public/bugs',
	passport.authenticate('user', { session: false }),
	bugRouter('Public')
)
app.use(
	'/api/v1/developers',
	passport.authenticate('developer', { session: false }),
	developerRouter
)
app.use(
	'/api/v1/discussions',
	passport.authenticate('developer', { session: false }),
	questionRouter
)

app.listen(port, () => {
	console.log(`Server Running on ${port}`)
});




