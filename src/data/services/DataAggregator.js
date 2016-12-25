'use es6';

import Client from 'nba-stats-client';
import Promise from 'bluebird';
import {List, Map} from 'immutable';

import ScoreboardGamesTranslator from '../translators/ScoreboardGamesTranslator';
import BoxScoreDataTranslator from '../translators/BoxScoreDataTranslator';
import PlayByPlayTranslator from '../translators/PlayByPlayTranslator';

import AggregatedGame from '../models/AggregatedGame';

export default class DataAggregator {
  static aggregate(year, month, day) {
    return DataAggregator.getTranslatedGames(year, month, day)
                         .then(games => {
                            let ids = List(games.map(game => game.id));
                            return Promise.all([
                              DataAggregator.getTranslatedBoxScores(year, month, day, ids),
                              DataAggregator.getTranslatedPlayByPlays(year, month, day, ids),
                              games])
                         })
                         .then(data =>
                           DataAggregator.buildSortedGames(DataAggregator.buildAggregatedGames(data[0], data[1], data[2]))
                         );
  }

  static buildSortedGames(games) {
    let upcoming = List();
    let active = List();
    games.forEach(game => {
      if (game.metadata.isUpcoming()) {
        upcoming = upcoming.push(game);
      } else {
        active = active.push(game);
      }
    });

    return Map({
      upcoming: upcoming,
      active: active
    });
  }

  static buildAggregatedGames(boxScores, playByPlays, games) {
    if (boxScores.size !== playByPlays.size) {
      throw new RangeError('box scores and play by plays must have same size');
    }

    if (boxScores.size !== games.size) {
      throw new RangeError('box scores and play by plays must have same size');
    }

    let data = List();
    for (let i = 0; i < games.size; i++) {
      let aggregatedGame = new AggregatedGame({
        metadata: games.get(i),
        boxScoreLeaders: boxScores.get(i),
        playByPlay: playByPlays.get(i),
      });
      data = data.push(aggregatedGame);
    }

    return data.sortBy(value => value.metadata.id);
  }

  static getTranslatedGames(year, month, day) {
    if (typeof year !== 'number') {
      throw new TypeError('year must be a number');
    }

    if (typeof month !== 'number') {
      throw new TypeError('month must be a number');
    }

    if (typeof day !== 'number') {
      throw new TypeError('day must be a number');
    }

    return Client.getGames(year, month, day)
                 .then(games => ScoreboardGamesTranslator.translate(games));
  }

  static getTranslatedBoxScores(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getTranslatedBoxScore(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getTranslatedBoxScore(year, month, day, gameId) {
    return Client.getBoxScore(year, month, day, gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore));
  }

  static getTranslatedPlayByPlays(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getTranslatedPlayByPlay(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getTranslatedPlayByPlay(year, month, day, gameId) {
    return Client.getPlayByPlay(year, month, day, gameId)
                 .then(playByPlay => PlayByPlayTranslator.translate(playByPlay));
  }
};
