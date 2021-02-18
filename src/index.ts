import './util/signale';
import './express/firebase';
import app from './express/app';
import config from './util/config';
import fs from 'fs';

const express = app();

const port = config.port;

express.listen(port, () => {
    console.log('Server Online');
});
fs.writeFileSync('./output', JSON.stringify({
    iss: 'https://securetoken.google.com/battle-stardom-d',
    aud: 'battle-stardom-d',
    auth_time: 1613622085,
    user_id: 'SVkOA7yoTiMEMu2gAlGnrzIwCc33',
    sub: 'SVkOA7yoTiMEMu2gAlGnrzIwCc33',
    iat: 1613629787,
    exp: 1613633387,
    email: 'ppertinate@gmail.com',
    email_verified: false,
    firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
    uid: 'SVkOA7yoTiMEMu2gAlGnrzIwCc33'
}));
