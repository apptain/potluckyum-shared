import { put, call, select } from 'redux-saga/effects'

//TODO fix
import * as actions from './modules/domainModule';
import {getDoc} from './selectors';

const DocState = {
  blank: "BLANK",
  new: "NEW",
  open: "OPEN",
  updated: "UPDATED",
  saved: "SAVED",
  closed: "CLOSED"
}

export function* docGetFetch(schemaName, apiCall, id, transform, keyField) {
    yield put(actions.docGetRestCall.request(...arguments))

    const {response, error} = yield call(apiCall, schemaName, id)
    if(response) {
        const doc = response
        const transformed = transform ? transform(doc) : doc

        //doc with that id currently in state (preven error on null)
        var currentDoc = yield select(getDoc, schemaName, id)
        if(!currentDoc){
            currentDoc =  Object.assign({}, {meta: {}})
        }
        if(currentDoc.meta.state == DocState.updated){
            //TODO better concurrency handling for updated doc
            yield put(actions.docGetRestCall.success(schemaName, {id, schemaName}, currentDoc))
        } else {
            var state = DocState.open
            if(currentDoc.meta.state == DocState.created){
                state = DocState.created
            } else if(currentDoc.meta.state == DocState.saved) {
                saved = DocState.saved
            }
            transformed.meta = {
                schemaName,
                keyField,
                changeLog: [],
                id: doc[keyField],
                state,
                //add more state recognition
                dateTimeCached: new Date(),
                dateTimeChanged: new Date(),
                initialValue: _.extend({}, transformed, {}),
                currentValue: _.extend({}, transformed, {}),
                domainDoc: doc
            }
            yield put(actions.docGetRestCall.success(schemaName, {id, schemaName}, transformed))
        }
    } else {
        yield put(actions.docGetRestCall.failure(schemaName, parameters, error))
    }
}

export function* docUpdateFetch(schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField){
    yield put(actions.docUpdateRestCall.request(...arguments))

    const domainDoc = formToDomainDoc(doc)
    const {response, error} =  yield call(apiCall, schemaName, domainDoc, id)

    if(response) {
        const updatedDomainDoc = response
        const formDoc = domainToFormDoc(updatedDomainDoc)
        formDoc.meta = Object.assign({}, doc.meta, {
            state: DocState.updated,
            //add more state recognition
            dateTimeCached: new Date(),
            dateTimeChanged: new Date(),
            currentValue: Object.assign({}, formDoc),
            domainDoc: updatedDomainDoc
        })

        yield put(actions.docUpdateRestCall.success(schemaName, id, formDoc))
    } else {
        yield put(actions.docUpdateRestCall.failure(schemaName, doc, error))
    }
}

export function* docCreateFetch(schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField){
    yield put(actions.docCreateRestCall.request(...arguments))

    const tempId = doc.meta.id
    const domainDoc = formToDomainDoc(doc)
    const {response, error} =  yield call(apiCall, schemaName, domainDoc)

    if(response) {
        const updatedDomainDoc = response
        const formDoc = domainToFormDoc(updatedDomainDoc)
        formDoc.meta = Object.assign({}, doc.meta, {
            id: domainDoc[keyField] || updatedDomainDoc[keyField],
            //TODO would making use of tempId all over make this cleaner? probably...
            tempId,
            state: DocState.created,
            dateTimeCached: new Date(),
            dateTimeChanged: new Date(),
            currentValue: Object.assign({}, formDoc),
            domainDoc: updatedDomainDoc
        })

        const id = formDoc.meta.id
        yield put(actions.docCreateRestCall.success(schemaName, id, formDoc))
        //really should be handling this nav in state, but works for now
        //window.location.href = '/sr/' + id
        browserHistory.push('/sr/' + id)
    } else {
        yield put(actions.docCreateRestCall.failure(schemaName, doc, error))
    }
}
