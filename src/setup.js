import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from './redux/createStore';

const store = createStore();

export default function setupApp(App) {
	class Root extends Component {
		render() {
			return (
				<Provider store={store}>
					<PersistGate persistor={store.persistor} loading={null}>
            <App/>
					</PersistGate>
				</Provider>
			);
		}
	}

	return Root;
}
