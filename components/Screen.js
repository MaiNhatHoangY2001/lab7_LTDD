import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Bottom from './Bottom';
import Top from './Top';

function Screen() {
	useEffect(() => {
		fetch('https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo')
			.then((response) => response.json())
			.then((todos) => setApi(todos));
	}, [api]);

	const [api, setApi] = useState([]);

	const screenView = (data, setData, screen) => {
		return (
			<View style={styles.container}>
				<Top data={data} setData={setData} screen={screen} />
				<Bottom data={data} setData={setData} screen={screen} />
			</View>
		);
	};

	return <>{screenView(api, setApi, false)}</>;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E5E5E5',
	},
	screenButton: {
		position: 'absolute',
		bottom: 0,
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: 'red',
		padding: 18,
		margin: 10,
	},
});

export default Screen;
