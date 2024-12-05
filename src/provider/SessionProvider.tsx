'use client';
import { store } from '@/redux/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
interface ISessionProvider {
  children: ReactNode;
}
const SessionProvider: FC<ISessionProvider> = ({ children }) => {
  return <Provider store={store}>{ children}</Provider>
};

export default SessionProvider;

