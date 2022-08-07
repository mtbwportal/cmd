import { AnonymousCredential, RemoteInsertManyResult, RemoteMongoClient, Stitch } from 'mongodb-stitch-server-sdk';

import players from './players';
import teams from './teams';
import rankings from './rankings';
import projections from './projections';

const stitch = Stitch.initializeDefaultAppClient('mtbw-hlcay');
const mongo = stitch.getServiceClient(RemoteMongoClient.factory, 'mongo');
const mlb = mongo.db('mlb');

stitch.auth
  .loginWithCredential(new AnonymousCredential())
  // .then(insertPlayers)
  // .then(insertTeams)
  // .then(insertRankings)
  .then(insertProjections)
  .then(() => process.exit())
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

function insertPlayers() {
  return mlb
    .collection('players')
    .insertMany(players)
    .then(({ insertedIds }) => {
      console.log(`${Object.keys(insertedIds).length} / ${players.length} inserted into 'mlb.players'`);
    })
    .catch(console.error);
}

function insertTeams() {
  return mlb
    .collection('teams')
    .insertMany(teams)
    .then(({ insertedIds }) => {
      console.log(`${Object.keys(insertedIds).length} / ${teams.length} inserted into 'mlb.teams'`);
    })
    .catch(console.error);
}

function insertRankings() {
  return mlb
    .collection('rankings')
    .insertMany(rankings)
    .then(({ insertedIds }) => {
      console.log(`${Object.keys(insertedIds).length} / ${rankings.length} inserted into 'mlb.rankings'`);
    })
    .catch(console.error);
}

function insertProjections() {
  return mlb
    .collection('projections')
    .insertMany(projections)
    .then(({ insertedIds }) => {
      console.log(`${Object.keys(insertedIds).length} / ${projections.length} inserted into 'mlb.projections'`);
    })
    .catch(console.error);
}
