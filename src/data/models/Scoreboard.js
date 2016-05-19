import {Record} from 'immutable';
import TotalScore from './TotalScore';

const defaults = {
  status: "",
  url: "",
  nbaStatsFormattedStartDate: "",
  unixMillisecondsStartTime: 0,
  localizedStartDate: "",
  isUpcoming: false,
  arena: "",
  city: "",
  state: "",
  isPreviewAvailable: true,
  isRecapAvailable: true,
  periodValue: "",
  periodStatus: "",
  gameClock: "",
  broadcasts: [],
  visitorAbbreviation: "",
  visitorName: "",
  visitorScore: 0,
  homeAbbreviation: "",
  homeName: "",
  homeScore: 0,
  periodScores: [],
  totalScore: new TotalScore(),
}

export default class Scoreboard extends Record(defaults) {
  getBroadcasts() {
    return this.broadcasts.toString();
  }
};
