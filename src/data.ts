let playerCount = 0;
let playerList = [];

const players = {
    playerCount: () => playerList.length,
    registerPlayer: () => {
        playerList.push({
            uuid: 'fake',
            email: 'fake@fakerson.com'
        });
    },
    unregisterPlayer: () => {

    }
};

let session: {
    [id: string]: {
        email: string;
    };
} = {
    'myuuid': {
        email: 'ppertinate@gmail.com'
    }
};

export {
    players,
    session
};
