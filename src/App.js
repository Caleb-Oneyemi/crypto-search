import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import {
	ChakraProvider,
	Box,
	Center,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Flex,
} from "@chakra-ui/react";
import "./App.css";

function App() {
	const [input, setInput] = useState({ limit: 5, start: 0 });
	const [coins, setCoins] = useState([]);

	const updateInputValues = (type, value) => {
		setInput({ ...input, [type]: value });
	};

	const fetchCoins = async () => {
		const { limit, start } = input;
		const data = await API.get(
			"cryptoapi",
			`/coins?limit=${limit}&start=${start}`
		);
		setCoins(data.coins);
	};

	useEffect(() => {
		fetchCoins();
	}, []);

	return (
		<ChakraProvider>
			<Box mt={10} mr={25} ml={25}>
				<Center>
					<Heading mb={4} color="teal">
						Crypto Search
					</Heading>
				</Center>

				<FormControl id="limit">
					<FormLabel>Limit</FormLabel>
					<Input
						placeholder="limit"
						onChange={(e) => updateInputValues("limit", e.target.value)}
						variant="filled"
					/>
				</FormControl>

				<FormControl id="start">
					<FormLabel>Start</FormLabel>
					<Input
						placeholder="start"
						onChange={(e) => updateInputValues("start", e.target.value)}
						variant="filled"
					/>
				</FormControl>

				<Button mt={4} colorScheme="teal" type="submit" onClick={fetchCoins}>
					Fetch Coins
				</Button>
			</Box>

			<br />
			<br />

			{coins.map((coin, index) => (
				<Box
					borderWidth="1px"
					borderRadius="lg"
					overflow="hidden"
					p="6"
					m="2"
					key={index}
				>
					<Flex justify="space-between">
						<Box mt="1" as="h2" lineHeight="tight">
							{coin.name} - {coin.symbol}
						</Box>

						<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
							${coin.price_usd}
						</Box>
					</Flex>
				</Box>
			))}
		</ChakraProvider>
	);
}

export default App;
