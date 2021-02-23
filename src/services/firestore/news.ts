import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const useNewsList = () => {
  // const [news, setNews] = useState<any>([]);
  // useEffect(() => {
  //   firestore()
  //     .collection('NewsList')
  //     .doc('NewsListId')
  //     .collection('business')
  //     .get()
  //     .then((snapshot) => {
  //       const snapshotDocs = snapshot.docs.map((doc) => {
  //         return doc.data();
  //       });
  //       setNews(snapshotDocs);
  //     })
  //     .catch((err) => {
  //       console.log('Error getting documents', err);
  //     });
  // }, []);
  // return news;
  // const [news, setNews] = useState<any>([]);
  // useEffect(() => {
  //   firestore()
  //     .collection('NewsList')
  //     .onSnapshot((snapshot) => {
  //       const snapshotDocs = snapshot.docs.map((doc) => {
  //         return doc.data();
  //       });
  //       setNews(snapshotDocs);
  //     });
  // }, []);
  // return news;

  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    firestore()
      .collection('NewsList')
      .limit(25)
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setNews(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);
  return news;
};

const useBreakingNews = () => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    firestore()
      .collection('NewsList')
      .where('category', '==', 'technology')
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setNews(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);
  return news;
};

export {useNewsList, useBreakingNews};
