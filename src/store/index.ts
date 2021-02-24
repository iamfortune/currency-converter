import { createStore, Action, action, Thunk, thunk } from "easy-peasy";
import axios from "../axios";

export interface ICurrency {
	currency_name: string;
	currency_code: string;
	decimal_units: string;
	countries: string[];
}

interface IAllCurrencies {
	data: ICurrency[];
	updateResult: Action<IAllCurrencies, ICurrency[]>;
	getAllCurrencies: Thunk<IAllCurrencies>;
}

interface ICurrencyRates {
	rates: { [key: string]: string };
	updateRates: Action<ICurrencyRates, any>;
	getCurrencyRates: Thunk<ICurrencyRates>;
}

interface IConversion {
	data: {
		to: string;
		amount: string;
	};
	updateTo: Action<IConversion, string>;
	updateAmount: Action<IConversion, string>;
}

export interface IStore {
	allCurrencies: IAllCurrencies;
	currencyRates: ICurrencyRates;
	conversion: IConversion;
}

const store = createStore<IStore>({
	allCurrencies: {
		data: [],
		updateResult: action((state, payload) => {
			state.data = Object.values(payload);
		}),
		getAllCurrencies: thunk(async (actions) => {
			try {
				const res = await axios.get(`/currencies`);
				actions.updateResult(res?.data?.response?.fiats);
			} catch (error) {
				console.log(error);
			}
		}),
	},
	currencyRates: {
		rates: {},
		updateRates: action((state, payload) => {
			state.rates = payload;
		}),
		getCurrencyRates: thunk(async (actions) => {
			try {
				const res = await axios.get(`/latest`);
				actions.updateRates(res?.data?.response?.rates);
			} catch (error) {
				console.log(error);
			}
		}),
	},
	conversion: {
		data: {
			to: "",
			amount: "",
		},
		updateTo: action((state, payload) => {
			state.data.to = payload;
		}),
		updateAmount: action((state, payload) => {
			state.data.amount = payload;
		}),
	},
});

export default store;
