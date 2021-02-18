import path from 'path';

export default {
    nodeEnv: process.env.node_env || '',
    sessionSecret: process.env.session_secret || '',
    firebaseConfig: process.env.firebase || '',
    firebaseDev: JSON.parse(process.env.firebaseDev || ''),
    rootDir: path.resolve(__dirname, '../../'),
    port: process.env.port || 8080
};
