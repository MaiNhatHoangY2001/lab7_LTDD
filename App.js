import { StyleSheet } from 'react-native';
import Screen from './components/Screen';

export default function App() {
	return (
		<>
			<Screen />
		</>
	);
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
