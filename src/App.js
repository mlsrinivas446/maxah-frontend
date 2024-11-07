import React, { Suspense, lazy } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import ReactContext from './context/ReactContext';

const Home = lazy(() => import("./components/Home"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const NotFound = lazy(() => import("./components/NotFound"));
const ApiLoadingView = lazy(() => import("./components/ApiLoadingView"));

const App = () => {
  const [searchInput, setSearchInput] = React.useState("");

  const onSetSearchInput = (data) => {
    setSearchInput(data);
  };

  return (
    <ReactContext.Provider value={{ searchInput, onSetSearchInput }}>
      <Header />
      <Toaster />
      <Suspense fallback={<ApiLoadingView />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ReactContext.Provider>
  );
};

export default App;
