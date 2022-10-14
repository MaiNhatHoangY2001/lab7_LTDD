import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Top({ data, setData, screen }) {
	const [text, setText] = useState('');

	const handleAdd = async (text) => {
		if (text !== '') {
			addDataApi({ id: data.length + 1, title: text });
			setData((prev) => [...prev, { id: prev.length + 1, title: text }]);
			setText('');
		}
	};

	const addDataApi = async (data) => {
		try {
			await fetch('https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo', {
				method: 'POST', // or 'PUT'
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(async (response) => await response.json())
				.then((todos) => {
					setData(todos);
				});
		} catch (error) {
			console.log('Error:', error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput style={styles.input} onChangeText={setText} value={text} />
			<TouchableOpacity style={styles.button} onPress={() => handleAdd(text)}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
		paddingTop: 50,
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		flex: 5,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		paddingVertical: 8,
		flex: 1,
		margin: 10,
		borderRadius: 35,
	},
});
