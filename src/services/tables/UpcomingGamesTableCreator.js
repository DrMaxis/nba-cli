'use es6';

import emoji from 'node-emoji';
import Table from 'cli-table2';
import {List, Map} from 'immutable';

export default class UpcomingGamesTableCreator {
  static create(data) {
    let table = new Table({
      head: UpcomingGamesTableCreator.getHeaders().toJS()
    });
    data.forEach(metadata =>
                 table.push(UpcomingGamesTableCreator.format(metadata).toJS()));
    return table.toString();
  }

  static format(data) {
    return List.of(
      data.getLocalizedStartDateTime(),
      data.home.getName(),
      data.visitor.getName(),
      data.getBroadcastsString(),
      data.location.getFormattedLocation(),
    );
  }

  static getHeaders() {
    let values = List.of(emoji.get('alarm_clock'),
                         emoji.get('house'),
                         emoji.get('bus'),
                         emoji.get('tv'),
                         emoji.get('round_pushpin'));

  return values.map(value => Map({
      content: value,
      hAlign: 'center'
    }));
  }
}
