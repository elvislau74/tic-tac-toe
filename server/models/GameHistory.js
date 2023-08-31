const { Schema, model } = require('mongoose');

const gameHistorySchema = new Schema({
  createTime: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  cellsFilled: [
    {
      type: Schema.Types.String,
    }
  ],
  win: {
    type: Schema.Types.Boolean,
    required: true
  },
  draw: {
    type: Schema.Types.Boolean,
    required: true
  },
  userThatPlayed: {
    type: Schema.Types.ObjectId,
    // reference is the related model
    ref: 'User',
    required: true
  }
});

const GameHistory = model('GameHistory', gameHistorySchema);

module.exports = GameHistory;
