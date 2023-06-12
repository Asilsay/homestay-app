import React, { FC } from 'react';
import Navbar from './Navbar';

interface Props {
  children?: React.ReactNode;
  id?: string;
  addClass?: string;
  chose: string;
}

const Layout: FC<Props> = ({ children, chose, id, addClass }) => {
  return (
    <>
      {chose === 'layout' ? (
        <>
          <Navbar />
          <div className="w-full min-h-screen flex flex-col">
            <div className="h-full w-full flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </>
      ) : (
        <section
          id={id}
          className={`w-full min-h-screen ${addClass}`}
        >
          {children}
        </section>
      )}
    </>
  );
};

export default Layout;
