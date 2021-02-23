import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const setBookmark = (news: Object, userEmail: string) => {
  firestore()
    .collection('Bookmark')
    .add({
      news: news,
      userEmail: userEmail,
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
      .where('userEmail', '==', 'tdmihiran@gmail.com')
      .onSnapshot((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          return doc.data().news;
        });
        setNews(snapshotDocs);
      });
  }, []);
  return news;
};

export {setBookmark, useGetBookmark};
