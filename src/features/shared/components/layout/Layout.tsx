import React from 'react';
import Navbar from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-primary to-secondary">
      <Navbar />
      <main className="container mx-auto px-4 mt-20 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
