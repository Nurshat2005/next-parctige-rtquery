import SessionProvider from '@/provider/SessionProvider';
import { FC, ReactNode } from 'react';

interface Ilayoutclient {
  children: ReactNode;
}
const LayoutClient: FC<Ilayoutclient> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutClient;
