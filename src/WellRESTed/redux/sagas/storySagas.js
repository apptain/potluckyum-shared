import { take, put, call, fork, select } from 'redux-saga/effects';
import { watchProfileGetRequest } from 'redux-form';

import {objectToArray} from '../../utils/mutations';
import { STORY_CHANGE,
    STORY_SELECT,
    STORIES_GET,
    STORIES_GET_SUCCESS,
    STORIES_GET_FAIL,
    STORY_UPSERT,
    STORY_UPSERT_SUCCESS,
    STORY_UPSERT_FAIL,
    CATEGORIES_GET,
    CATEGORIES_GET_SUCCESS,
    CATEGORIES_GET_FAIL } from '../modules/story';

function* storyGetFetch(apiCall, filter) {
    const {response, error} = yield call(apiCall, filter);
    if(response) {
        const story = response;
        yield put({ type: STORIES_GET_SUCCESS, story})
    } else {
        yield put({ type: STORIES_GET_FAIL, error})
    }
}

function* watchStoryGetRequest() {
    while (true) {
        const { apiCall, filter } = yield take(STORIES_GET);
        yield fork(storyGetFetch, apiCall, filter);
    }
}

function* storyUpsertFetch(apiCall, story, token) {
    const {response, error} = yield call(apiCall, story, token);
    if(response) {
        const story = response;
        yield put({ type: STORY_UPSERT_SUCCESS, story})
    } else {
        yield put({ type: STORY_UPSERT_FAIL, error})
    }
}

function* watchStoryUpsertRequest() {
    while (true) {
        const { apiCall, story, token } = yield take(STORY_UPSERT);
        yield fork(storyUpsertFetch, apiCall, story, token);
    }
}

export default function* root() {
  yield [
    fork(watchStoryGetRequest),
    fork(watchStoryUpsertRequest)
  ];
}
