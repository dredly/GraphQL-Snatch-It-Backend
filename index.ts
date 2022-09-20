import startLobbyServer from 'gqlobby-server';

const PORT = 4000;

void startLobbyServer({port: PORT, lobbyOptions: {minPlayers: 1, maxPlayers: 6}});
