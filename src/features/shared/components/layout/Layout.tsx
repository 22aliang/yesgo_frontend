import React from 'react';
import Navbar from '../navbar/Navbar';
import { Footer } from '../footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-primary to-secondary">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        theme="colored"
      />
      <main className="container mx-auto px-4 mt-20 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
