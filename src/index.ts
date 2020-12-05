import fetch from 'node-fetch';
import eurekaClient from './eureka';
import timeout from './utils/timeout';

const EXPRESS_SERVER_ID: string = 'express-service';

(async () => {
	await eurekaClient.start();
	await timeout(500);

	const expressServer = await eurekaClient.getInstancesByAppId(EXPRESS_SERVER_ID)[0];
	const EXPRESS_SERVICE_HOST = expressServer.hostName;
	const EXPRESS_SERVICE_PORT = expressServer.port['$'];

	console.log('EXPRESS SERVICE HOST::', EXPRESS_SERVICE_HOST);
	console.log('EXPRESS SERVICE POST::', EXPRESS_SERVICE_PORT);

	const response = await fetch(`http://${EXPRESS_SERVICE_HOST}:${EXPRESS_SERVICE_PORT}`);
	const raw = await response.json();
	console.log('response::', raw);
})();
