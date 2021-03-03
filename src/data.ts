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

export {
    players
};
