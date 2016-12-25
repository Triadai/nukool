import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import { hashHistory } from 'react-router';
import request from 'superagent';

function sendMessages(payload) {
  return request
    .post('https://nukool-server.herokuapp.com')
    .send(
      payload
    )
    .set('Accept', 'application/json')
    .then((res) => res.text);
}

function* callSendMessages(action) {
  hashHistory.push('/wait');
  const result = yield call(sendMessages, action);
  yield put({type: 'SEND_MESSAGES_DONE', result});
  hashHistory.push('/result');
}

function* sendMessagesSaga() {
  yield* takeEvery('REQUEST_SEND_MESSAGES', callSendMessages);
}

export default function* root(feathersApp) {
  yield [
    fork(sendMessagesSaga)
  ]
}