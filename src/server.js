import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		(req, res, next) => {
			if (!dev) {
				// redirect requests to https if not in dev mode
				req.headers["x-forwarded-proto"] !== "https"
					? res.redirect(301, "https://" + req.hostname + req.originalUrl)
					: next();
			} else next();
		}
	)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	)
	.listen(PORT, (err) => {
		if (err) console.log('error', err);
	});
