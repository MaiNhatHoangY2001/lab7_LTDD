import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Bottom({ data, setData, screen }) {
	const [isInputText, setIsInputText] = useState(-1);
	const [editText, setEditText] = useState('');

	const handleRemoveData = (id) => {
		setData((prev) => prev.filter((item) => item.id !== id));
		deleteDataApi(id);
	};
	const handleEditData = (id, oldText) => {
		setIsInputText(id);
		setEditText(oldText);
	};
	const handleConfirmData = (id, oldText) => {
		setIsInputText(-1);
		if (editText !== oldText) {
			const editData = {
				id: id,
				title: editText,
			};
			editDataApi(id, editData);
			setData((prev) => editDataLocal(prev, id, editText));
		}
	};

	const editDataLocal = (data, id, text) => {
		const editIndex = data.findIndex((item) => item.id === id);
		data[editIndex].title = text;
		return data;
	};

	const editDataApi = async (id, editData) => {
		try {
			await fetch(`https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(editData),
			});
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const deleteDataApi = async (id) => {
		try {
			await fetch(`https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo/${id}`, {
				method: 'DELETE', // or 'PUT'
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log('Error:', error);
		}
	};

	return (
		<ScrollView style={styles.container}>
			{data?.map((todo, index) => {
				return (
					<View style={styles.item} key={index}>
						<TouchableOpacity style={styles.button} disabled>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>{index + 1}</Text>
						</TouchableOpacity>
						{isInputText !== todo.id ? (
							<Text style={styles.title}>{todo.title}</Text>
						) : (
							<TextInput style={[styles.title, { borderWidth: 1, marginVertical: 0 }]} value={editText} onChangeText={setEditText} />
						)}

						{isInputText !== todo.id ? (
							<>
								<TouchableOpacity
									style={[styles.button, { backgroundColor: '#33b5e5', borderWidth: 0 }]}
									onPress={() => handleEditData(todo.id, todo.title)}
								>
									<Text
										style={
											screen
												? { fontWeight: 'bold', fontSize: 20, color: 'white' }
												: {
														fontWeight: 'bold',
														fontSize: 20,
														color: 'white',
														paddingVertical: 5,
												  }
										}
									>
										{screen ? 'Done' : 'E'}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, { backgroundColor: '#ff4444', borderWidth: 0 }]}
									onPress={() => handleRemoveData(todo.id)}
								>
									<Text
										style={
											screen
												? { fontWeight: 'bold', fontSize: 20, color: 'white' }
												: {
														fontWeight: 'bold',
														fontSize: 20,
														color: 'white',
														paddingVertical: 5,
												  }
										}
									>
										{screen ? 'Done' : 'X'}
									</Text>
								</TouchableOpacity>
							</>
						) : (
							<TouchableOpacity
								style={[styles.button, { backgroundColor: '#00C851', borderWidth: 0 }]}
								onPress={() => handleConfirmData(todo.id, todo.title)}
							>
								<Text
									style={
										screen
											? { fontWeight: 'bold', fontSize: 20, color: 'white' }
											: {
													fontWeight: 'bold',
													fontSize: 20,
													color: 'white',
													paddingVertical: 5,
											  }
									}
								>
									{screen ? 'Done' : 'V'}
								</Text>
							</TouchableOpacity>
						)}
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		height: '82%',
		paddingBottom: 10,
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 5,
		flexDirection: 'row',
		margin: 4,
		marginBottom: 10,
		padding: 10,
	},
	button: {
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 5,
		borderWidth: 1,
		margin: 10,
		borderRadius: 3,
		marginHorizontal: 5,
		flex: 1,
	},
	title: {
		alignSelf: 'center',
		fontSize: 20,
		margin: 20,
		flex: 7,
	},
});
