import emoji from 'node-emoji';
import { Map } from 'immutable';

const BASE_NBA_DATA_URL = 'http://data.nba.com/';
const BASE_NBA_DATA_SCOREBOARD_URL = BASE_NBA_DATA_URL.concat('data/5s/json/cms/noseason/scoreboard/');
const BASE_NBA_DATA_PLAY_BY_PLAY_URL = BASE_NBA_DATA_URL.concat('data/5s/json/cms/noseason/game/');

const DEFAULT_DATE_FORMAT = 'YYYYMMDD';
const DEFAULT_TIMEZONE = 'America/New_York';
const INPUT_DATE_FORMAT = 'YYYY-MM-DD';

const TRANSLATED_NBA_DATE_TIME_FORMAT = 'YYYYMMDDHHmm';
const TRANSLATED_DATE_FORMAT = 'LLL';

const PREGAME = 'PREGAME';
const LIVE = 'LIVE';
const FINAL = 'FINAL';

const TRANSLATED_GAME_STATUS_MAP = {
  1: PREGAME,
  2: LIVE,
  3: FINAL,
};

const ONE_HUNDRED = 100;

const HOME_EMOJI_VALUE = 'house';
const VISITOR_EMOJI_VALUE = 'bus';
const START_TIME_EMOJI_VALUE = 'alarm_clock';
const BROADCASTS_EMOJI_VALUE = 'tv';
const SCORE_100_EMOJI_VALUE = '100';
const PLAY_TIME_EMOJI_VALUE = 'hourglass_flowing_sand';

const GAMES_OPTIONS = {
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  TOMORROW: 'TOMORROW',
};

const PLAY_TIME_EMOJI = emoji.get(PLAY_TIME_EMOJI_VALUE);
const START_TIME_EMOJI = emoji.get(START_TIME_EMOJI_VALUE);
const BROADCASTS_EMOJI = emoji.get(BROADCASTS_EMOJI_VALUE);
const HOME_EMOJI = emoji.get(HOME_EMOJI_VALUE);
const VISITOR_EMOJI = emoji.get(VISITOR_EMOJI_VALUE);
const LOCATION_EMOJI = emoji.get('round_pushpin');

const NBA_GAME_STATUSES = Map({

});

module.exports = {
  BASE_NBA_DATA_SCOREBOARD_URL,
  BASE_NBA_DATA_PLAY_BY_PLAY_URL,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEZONE,
  TRANSLATED_NBA_DATE_TIME_FORMAT,
  TRANSLATED_DATE_FORMAT,
  PREGAME,
  LIVE,
  FINAL,
  TRANSLATED_GAME_STATUS_MAP,
  HOME_EMOJI_VALUE,
  HOME_EMOJI,
  VISITOR_EMOJI_VALUE,
  VISITOR_EMOJI,
  START_TIME_EMOJI_VALUE,
  START_TIME_EMOJI,
  BROADCASTS_EMOJI_VALUE,
  BROADCASTS_EMOJI,
  SCORE_100_EMOJI_VALUE,
  PLAY_TIME_EMOJI_VALUE,
  GAMES_OPTIONS,
  ONE_HUNDRED,
  PLAY_TIME_EMOJI,
  LOCATION_EMOJI,
  INPUT_DATE_FORMAT,
};
