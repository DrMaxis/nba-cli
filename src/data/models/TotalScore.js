import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';

const defaults = {
  homeScore: 0,
  visitorScore: 0,
}

export default class TotalScore extends Record(defaults){
  getWinningTeam() {
    const scoreDifference = this.homeScore - this.visitorScore;
    if (scoreDifference == 0) {
      return 'TIE';
    }

    else if (scoreDifference < 0) {
      return 'VISITOR';
    }

    else {
      return 'HOME';
    }
  }

  static getFormattedScore(score, opponentScore) {
    if (score == Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }
    const strValue = score.toString();
    if (score > opponentScore) {
      return strValue.green;
    
    } else if (score < opponentScore) {
      return strValue.red;
    }

    return strValue.blue;
  }

  getFormattedHomeScore() {
    return TotalScore.getFormattedScore(this.homeScore, this.visitorScore);
  }

  getFormattedVisitorScore() {
    return TotalScore.getFormattedScore(this.visitorScore, this.homeScore); 
  }
};