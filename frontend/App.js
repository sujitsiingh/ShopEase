import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import store from './states/store';
import UserProfileScreen from './Screens/profile/UserProfileScrren';
import ProductDetailScreen from './Screens/user/ProductDetailScreen';
import { UserContext } from './states/UserContext';

export default function App() {
  console.reportErrorsAsExceptions = false;

  return (
    <>
      {/* <UserProfileScreen/> */}
      {/* <ProductDetailScreen navigation={navigation} /> */}
      <Provider store={store}>
        <UserContext>
          <Routes />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
