'use es6';

import {List, Record} from 'immutable';

let defaults = {
  metadata: undefined,
  boxScoreLeaders: List(),
  playByPlay: List(),
};

export default class Game extends Record(defaults) {
}
