import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {News} from '../types';

const db = firestore().collection('products');
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
    db.limit(25)
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          doc.data()._id = doc.id;
          return doc.data();
        });
        setNews(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);
  return news as [News];
};

const useBreakingNews = () => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    db.where('category_id', '==', '11')
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          doc.data()._id = doc.id;
          return doc.data();
        });

        setNews(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);
  return news as [News];
};

const useNewsGetByCategory = (category: string) => {
  const [news, setNews] = useState<any>([]);
  useEffect(() => {
    db.where('category_id', '==', category)
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          doc.data()._id = doc.id;
          return doc.data();
        });
        setNews(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, [category]);
  return news as [News];
};

export {useNewsList, useBreakingNews, useNewsGetByCategory};
