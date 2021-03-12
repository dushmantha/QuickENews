import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Category} from '../types';

const useCategories = () => {
  const [category, setCategory] = useState<any>([]);
  useEffect(() => {
    firestore()
      .collection('categories')
      .limit(25)
      .get()
      .then((snapshot) => {
        const snapshotDocs = snapshot.docs.map((doc) => {
          doc.data()._id = doc.id;
          return doc.data();
        });
        setCategory(snapshotDocs);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);
  return category as [Category];
};

export {useCategories};
