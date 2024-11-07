import axios from "axios";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { IoMdAdd } from "react-icons/io";
import ReactContext from '../../context/ReactContext';
import AddProduct from "../AddProduct";
import ApiFailureView from "../ApiFailureView";
import ApiLoadingView from "../ApiLoadingView";
import EmptyResultsView from '../EmptyResultsView';
import ProductCard from '../ProductCard';
import "./index.css";

// api constants used to display success, failure, loading views
const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  progress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    productsList: [],
    isAddProductVisible: false, // state to display add product section
    currentPage: 1,
    productsPerPage: 12,
    apiStatus: apiConstants.initial,
  };


  componentDidMount() {
    this.fetchProducts();
  }

  // fetch product details
  fetchProducts = async () => {
    this.setState({ apiStatus: apiConstants.progress });
    try {
      const response = await axios.get("https://maxah-backend.onrender.com/api/products");
      this.setState({ productsList: response?.data?.products, apiStatus: apiConstants.success });
    } catch (error) {
      this.setState({ apiStatus: apiConstants.failure });
      console.error("Error fetching products:", error);
    }
  };

  // event handler to toggle between home and add product section
  handleAddProductToggle = () => {
    this.setState((prevState) => ({
      isAddProductVisible: !prevState.isAddProductVisible
    }));
    this.fetchProducts();
  };

  // event handler pagination
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { productsList, isAddProductVisible, currentPage, productsPerPage, apiStatus } = this.state;

    return (
      <ReactContext.Consumer>
        {({ searchInput="" }) => {

          // filter the products based on user search
          const filteredProducts = productsList.filter(product => {
        const productPrice = product.price ? product.price.toString() : '';
        return (
          (typeof searchInput === "string" && searchInput.trim() === "") ||
          product.title.toLowerCase().includes(searchInput.toLowerCase()) || 
          product.description.toLowerCase().includes(searchInput.toLowerCase()) ||
          productPrice.includes(searchInput.toLowerCase())
        );
      });

          // calculate number of products for page and current page
          const indexOfLastProduct = currentPage * productsPerPage;
          const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
          const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

          // calculate total pages based on numder of products
          const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


          // Render success view when API request is successful
          const renderSuccessView = () => (
            isAddProductVisible ? (
              <AddProduct handleAddProductToggle={this.handleAddProductToggle} />
            ) : (
              <ul className='products-lists-container'>
                {currentProducts.length > 0 ? (
                  currentProducts.map(eachProduct => (
                    <ProductCard key={eachProduct._id} product={eachProduct} />
                  ))
                ) : (
                  <EmptyResultsView />
                )}
              </ul>
            )
          );

          // Render loading view when data is being fetched
          const renderLoadingView = () => <ApiLoadingView />;

          // Render failure view when data api fails
          const renderFailureView = () => <ApiFailureView />;

          // function to display view based on api status
          const renderApiViews = () => {
            switch (apiStatus) {
              case apiConstants.success:
                return renderSuccessView();
              case apiConstants.failure:
                return renderFailureView();
              case apiConstants.progress:
                return renderLoadingView();
              default:
                return null;
            }
          };

          return (
            <div className="Home-page bg-body-tertiary">
              <div className='products-container'>
                <div className='heading-add-product-container mt-3'>
                  <h1 className='products-heading'>{isAddProductVisible ? "Add Product" : "Products"}</h1>
                  {/*conditionally displaying add product button */}
                  {!isAddProductVisible && (
                    <Button variant="primary" className="d-flex align-items-center" onClick={this.handleAddProductToggle}>
                      <span className="me-2 mb-1"><IoMdAdd /></span>Add Product
                    </Button>
                  )}
                </div>

                {renderApiViews()} 
                
                {/* conditionally  display pagination based on products length*/}
                {!isAddProductVisible && filteredProducts.length > productsPerPage && (
                  <div className="pagination-container text-center m-3">
                    <Button 
                      variant="primary" 
                      disabled={currentPage === 1} 
                      onClick={() => this.handlePageChange(currentPage - 1)}
                      className="m-2"
                    >
                      Previous
                    </Button>
                    <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
                    <Button 
                      variant="primary" 
                      disabled={currentPage === totalPages} 
                      onClick={() => this.handlePageChange(currentPage + 1)}
                      className="m-2"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </ReactContext.Consumer>
    );
  }
}

export default Home;
