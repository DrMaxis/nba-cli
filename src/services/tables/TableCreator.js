import Table from 'cli-table2';
import { List } from 'immutable';

import StartedGameTableCreator from './StartedGameTableCreator';
import GamesTables from '../../data/GamesTables';
import PlaysTableCreator from './PlaysTableCreator';
import HomeTeamBoxScoreLeadersTableCreator from './HomeTeamBoxScoreLeadersTableCreator';
import AwayTeamBoxScoreLeadersTableCreator from './AwayTeamBoxScoreLeadersTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';

export default class TableCreator {
  static create(data) {
    const upcomingTable = data.upcoming.isEmpty()
      ? undefined
      : UpcomingGamesTableCreator.create(data.upcoming);
    return new GamesTables({
      started: List(data.started.map(game => TableCreator.createGameTable(game))),
      upcoming: upcomingTable,
    });
  }

  static createGameTable(game) {
    const table = new Table();
    table.push(TableCreator.createStartedGameTable(game.metadata));
    table.push(TableCreator.createBoxScoreLeadersTables(game.boxScoreLeaders));
    table.push(TableCreator.createPlaysTable(game.plays));
    return table.toString();
  }

  static createStartedGameTable(data) {
    return [
      {
        content: StartedGameTableCreator.create(data),
        colSpan: 2,
        hAlign: 'center',
      },
    ];
  }

  static createBoxScoreLeadersTables(boxScoreLeaders) {
    return [
      {
        content: HomeTeamBoxScoreLeadersTableCreator.create(boxScoreLeaders.home),
        colSpan: 1,
        hAlign: 'center',
      },
      {
        content: AwayTeamBoxScoreLeadersTableCreator.create(boxScoreLeaders.visitor),
        colSpan: 1,
        hAlign: 'center',
      },
    ];
  }

  static createPlaysTable(plays) {
    return [
      {
        content: PlaysTableCreator.create(plays),
        colSpan: 2,
        hAlign: 'center',
      },
    ];
  }
}
