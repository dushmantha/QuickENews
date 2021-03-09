import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Bookmark} from '../types';
const user = auth().currentUser;
const setBookmark = (news: Object) => {
  firestore()
    .collection('bookmark')
    .add({
      news: news,
      user_email: user && user.email,
    })
    .then(() => {
      console.log('Boomark added!');
    });
};

const deleteBookmark = (id: string) => {
  firestore()
    .collection('bookmark')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Boomark removed');
    });
};

const useGetBookmark = () => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    firestore()
      .collection('bookmark')
      .where('user_email', '==', user && user.email)
      .onSnapshot((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          doc.data()._id = doc.id;
          return doc.data();
        });
        setNews(snapshotDocs);
      });
  }, []);
  return news as [Bookmark];
};

export {setBookmark, useGetBookmark, deleteBookmark};
