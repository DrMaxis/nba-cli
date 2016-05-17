import Table from 'cli-table2';
import moment from 'moment-timezone';

import NbaDataClient from '../../data/NbaDataClient';
import StartedGameTableCreator from '../../tables/StartedGameTableCreator';
import UpcomingGameTableCreator from '../../tables/UpcomingGameTableCreator';
import PlayByPlayTableCreator from '../../tables/PlayByPlayTableCreator';
import BoxScoreTableCreator from '../../tables/BoxScoreTableCreator';

export default class CommandLineOutputClient {
  constructor() {
    this.nbaDataClient = new NbaDataClient();
    this.startedGameTableCreator = new StartedGameTableCreator();
    this.playByPlayTableCreator = new PlayByPlayTableCreator();
    this.upcomingGameTableCreator = new UpcomingGameTableCreator();
    this.boxScoreTableCreator = new BoxScoreTableCreator();
  }

  static hasPlayByPlay(data) {
    return typeof data.playByPlay !== 'undefined' && gameData.playByPlay.length > 0;
  }

  static hasBoxScore(data) {
    return typeof data.boxScore !== 'undefined';
  }

  generateFirstRow(data) {
    const row = [this.startedGameTableCreator.create(data)];
    if (CommandLineOutputClient.hasPlayByPlay(data)) {
      row.push(this.playByPlayTableCreator.create(data.playByPlay));
    }
    return row;
  }

  generateSecondRow(data) {
    const row = [];
    if (CommandLineOutputClient.hasBoxScore(data)) {
      row.push(boxScoreTableCreator.create(data.boxScore.home));
      row.push(boxScoreTableCreator.create(data.boxScore.visitor));
    }
    return row;
  }

  outputStartedGameTable(data) {
    var table = new Table();
    table.push(this.generateFirstRow(data));
    table.push(this.generateSecondRow(data));
    console.log(table.toString());
  }

  outputUpcomingGames(upcomingGames) {
    upcomingGames.map(game => console.log(upcomingGameTableCreator.create(game)));
  }

  outputGames(data) {

  }
}

function outputGames(data) {
  const upcomingGames = [];
  Object.keys(data).forEach(function(key) {
    const gameData = data[key];
    if (isGameUpcoming(gameData)) {
      upcomingGameData.push(gameData);
    } else {
      outputStartedGameTable(gameData);
    }
  });

  this.outputUpcomingGames(upcomingGames);
}