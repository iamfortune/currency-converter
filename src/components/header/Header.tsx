import { useState } from "react";
import { Button, Form, FormGroup, Input, Jumbotron } from "reactstrap";
import { ICurrency } from "../../store";
import { useStoreState, useStoreActions } from "../../store/typehook";

const Header = () => {
	const allCurrencies = useStoreState((state) => state.allCurrencies.data);
	const setAmountToConvert = useStoreActions((actions) => actions.conversion.updateAmount);
	const setCurrencyToConvertTo = useStoreActions((actions) => actions.conversion.updateTo);
	const [to, setTo] = useState<string>("");
	const [amount, setAmount] = useState<string>("");

	const onSubmitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		(to && amount) && setAmountToConvert(amount);
		(to && amount) && setCurrencyToConvertTo(to);
	};

	return (
		<div className="text-center">
			<Jumbotron fluid>
				<h1 className="display-4">Mini Currency Converter</h1>
				<div className="w-50 mx-auto">
					<Form id='my-form' onSubmit={onSubmitHandler}>
						<FormGroup className="d-flex flex-row mt-5 mb-5">
							<Input
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="Amount in Number"
							/>
							<Input
								type="text"
								value="from USD ($)"
								className='text-center w-50 mx-4'
								disabled
							/>
							<Input
								type="select"
								value={to}
								onChange={(e) => setTo(e.target.value)}
							>
								<option>Converting to?</option>
								{allCurrencies.map((currency: ICurrency) => (
									<option
										key={currency?.currency_code}
										value={currency?.currency_code}
									>
										{currency?.currency_name}
									</option>
								))}
							</Input>
						</FormGroup>
					</Form>
					<Button
						color="primary"
						size="lg"
						block
						className="px-4"
						type="submit"
						form='my-form'
					>
						Convert
					</Button>
				</div>
			</Jumbotron>
		</div>
	);
};

export default Header;
