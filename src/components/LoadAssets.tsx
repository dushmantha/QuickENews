import React, {ReactElement, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Category} from '../types';
import {useCategories} from '../services';
interface LoadAssetsProps {
  children: ReactElement | ReactElement[];
}

const contextDefaultValues: Category = {
  title: '',
  id: '',
};

const CategoriesContext = createContext<[Category]>([contextDefaultValues]);

const LoadAssets = ({children}: LoadAssetsProps) => {
  return (
    <CategoriesContext.Provider value={useCategories()}>
      <NavigationContainer>{children}</NavigationContainer>
    </CategoriesContext.Provider>
  );
};
export {CategoriesContext};
export default LoadAssets;
