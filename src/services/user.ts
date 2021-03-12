import firestore from '@react-native-firebase/firestore';
import {storeUser} from '../storage';
import {User} from '../types';

const setUser = (user: any) => {
  firestore()
    .collection('customers')
    .add({
      breaking_news: true,
      morning_briefing: true,
      business_and_technology: true,
      evening_briefing: true,
      politics: true,
      sport: true,
      live_politics_update: true,
      health: true,
      email: user && user.email,
      is_active: true,
      first_name:
        user && user.displayName ? user.displayName : user && user.email,
      subs_type: 'free',
    })
    .then((data) => {
      console.log('user added!', data);
      return true;
    })
    .catch((error) => console.error(error));
};

const getUser = (email: string) => {
  firestore()
    .collection('customers')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        doc.data()._id = doc.id;
        storeUser(doc.data() as User);
        return doc.data() as User;
      });
    })
    .catch((error) => console.error(error));
};

export {getUser, setUser};
