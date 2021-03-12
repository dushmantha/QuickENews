import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types';
const storeUser = async (user: User) => {
  console.log('print -----AAADSDD', user);
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('@storage_user_key', jsonValue);
  } catch (error) {
    console.error(error);
  }
};

const getUserFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_user_key');
    return jsonValue != null ? (JSON.parse(jsonValue) as User) : null;
  } catch (error) {
    console.error(error);
  }
};

const mergeUsers = async (user: User) => {
  try {
    await AsyncStorage.mergeItem('@storage_user_key', JSON.stringify(user));
    const currentUser = await AsyncStorage.getItem('@storage_user_key');

    console.log(currentUser);
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('@storage_user_key');
  } catch (error) {
    console.error(error);
  }

  console.log('Done.');
};

export {storeUser, getUserFromStorage, removeUser, mergeUsers};
