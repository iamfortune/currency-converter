import { useEffect } from "react";
import { useStoreActions, useStoreState } from "./store/typehook";
import Header from "./components/header/Header";

const App = () => {
	const getAllCurrencies = useStoreActions(
		(actions) => actions.allCurrencies.getAllCurrencies
	);
	const getCurrencyRates = useStoreActions(
		(actions) => actions.currencyRates.getCurrencyRates
	);
	const currencyRates = useStoreState((state) => state.currencyRates.rates);
	const amountToConvert = useStoreState(
		(state) => state.conversion.data.amount
	);
	const currencyConvertingTo = useStoreState(
		(state) => state.conversion.data.to
	);

	useEffect(() => {
		getAllCurrencies();
		getCurrencyRates();
	}, [getAllCurrencies, getCurrencyRates]);

	const equivalence = () => {
		const val = Number(currencyRates[currencyConvertingTo]);

		return val * parseInt(amountToConvert);
	};

	return (
		<div
			style={{ background: "#E9ECEF", height: "100vh" }}
			className="container-fluid"
		>
			<Header />
			<div className="w-50 mx-auto">
				{amountToConvert && currencyConvertingTo ? <h2>Result:</h2> : null}
				{amountToConvert ? (
					<h3>
						${amountToConvert} = {equivalence()}
					</h3>
				) : null}
			</div>
		</div>
	);
};

export default App;
