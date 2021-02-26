import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {News} from '../../types';
const user = auth().currentUser;
const setBookmark = (news: Object) => {
  firestore()
    .collection('Bookmark')
    .add({
      news: news,
      userEmail: user && user.email,
    })
    .then(() => {
      console.log('Boomark added!');
    });
};

const useGetBookmark = () => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    firestore()
      .collection('Bookmark')
      .where('userEmail', '==', user && user.email)
      .onSnapshot((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          return doc.data().news;
        });
        setNews(snapshotDocs);
      });
  });
  return news as [News];
};

export {setBookmark, useGetBookmark};
