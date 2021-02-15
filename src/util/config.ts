import path from 'path';

export default {
    nodeEnv: process.env.node_env || '',
    sessionSecret: process.env.session_secret || '',
    rootDir: path.resolve(__dirname, '../../')
};
