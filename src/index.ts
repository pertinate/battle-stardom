import './util/signale';
import app from './express/app';
import config from './util/config';

const express = app();

const port = config.port;

express.listen(port, () => {
    console.log('Server Online');
});
