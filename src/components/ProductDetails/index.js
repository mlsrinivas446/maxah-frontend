import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';
import { BsDashSquare, BsPlusSquare } from 'react-icons/bs';
import { MdOutlineClose, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ApiFailureView from "../ApiFailureView";
import ApiLoadingView from "../ApiLoadingView";
import './index.css';

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
};

const ProductDetails = () => {
    const [productData, setProductData] = useState({});
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [quantity, setQuantity] = useState(1);
    const [edit, setEdit] = useState(false);
    const [editProductData, setEditProductData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: ''
    });

    const { id } = useParams(); // to get productId from url
    const navigate = useNavigate(); // navigate function to redirect

    // Fetch product data from the server
    const getProductData = useCallback(async () => {
        setApiStatus(apiStatusConstants.inProgress);
        
        try {
            const apiUrl = `https://maxah-backend.onrender.com/api/product-details/${id}`;
            const response = await axios.get(apiUrl);
            const product = response.data.product;
            toast.success("Product data loaded successfully!");
            setProductData(product); // set product to state
            setEditProductData({ ...product });// set product data for edit
            setApiStatus(apiStatusConstants.success); // set api status success
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to load product data"); 
            setApiStatus(apiStatusConstants.failure);// set api status failure
        }
    }, [id]);

    // useEffect hook used for life cycle methods
    useEffect(() => {
        getProductData(); // fetch the product details from server
    }, [getProductData]);

    //function to delete product from server
    const onDeleteProduct = async () => {
        try {
            const apiUrl = `https://maxah-backend.onrender.com/api/delete-product/${id}`;
            const response = await axios.delete(apiUrl);
            toast.success(response?.data?.message || "Product deleted successfully!"); // Success toast
            navigate("/");
            setApiStatus(apiStatusConstants.success);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete the product"); // Error toast
            console.error(error);
            setApiStatus(apiStatusConstants.failure);
        }
    };

    // function to update product details
    const onSaveProductDetails = async () => {
        try {
            const apiUrl = `https://maxah-backend.onrender.com/api/update-product/${id}`;
            const response = await axios.put(apiUrl, editProductData);
            toast.success(response?.data?.message ||"Product details updated successfully!");
            getProductData();
            setEdit(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to save product data");
            console.error(error);
            setApiStatus(apiStatusConstants.failure);
        }
    };

    // Toggle edit mode
    const onUpdateProductDetails = () => {
        setEdit(!edit);
        if (edit) {
            setEditProductData({ ...productData });
        }
    };

    // Handle input changes during editing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle quantity increment and decrement
    const handleQuantityChange = (type) => {
        setQuantity((prevQuantity) => {
            if (type === 'increment') return prevQuantity + 1;
            if (type === 'decrement') return prevQuantity <= 1 ? 1 : prevQuantity - 1;
            return prevQuantity;
        });
    };

    // Render loading view when data is being fetched
    const renderLoadingView = () => <ApiLoadingView />;

    // Render failure view when data api fails
    const renderFailureView = () => <ApiFailureView />;

    // Render success view when API request is successful
    const renderSuccessView = () => {
        return (
            <div className="product-details-view">
                {/* toggle edit mode*/}
                <button
                    className="edit-button"
                    type="button"
                    onClick={onUpdateProductDetails}
                >
                    {edit ? <MdOutlineClose className="edit-icon" /> : <MdOutlineModeEditOutline className="edit-icon" />}
                </button>
                <div className="product-details-container">
                    <img src={productData.image} alt="product" className="product-image" />
                    {/* Render title input or text based on edit mode */}
                    <div className="product">
                        {edit ? (
                            <input
                                type="text"
                                name="title"
                                value={editProductData.title}
                                onChange={handleChange}
                                className="product-input"
                            />
                        ) : (
                            <h1 className="product-name">{productData.title}</h1>
                        )}
                        {edit ? (
                            <input
                                type="number"
                                name="price"
                                value={editProductData.price}
                                onChange={handleChange}
                                className="product-input"
                            />
                        ) : (
                            <p className="price-details">Rs {productData.price}/-</p>
                        )}
                        {edit ? (
                            <textarea
                                name="description"
                                value={editProductData.description}
                                onChange={handleChange}
                                className="product-input"
                            />
                        ) : (
                            <p className="product-description">{productData.description}</p>
                        )}
                        {/* Render title input or text based on edit mode */}
                        <div className="label-value-container">
                            <p className="label">Category:</p>
                            {edit ? (
                                <input
                                    type="text"
                                    name="category"
                                    value={editProductData.category}
                                    onChange={handleChange}
                                    className="product-input"
                                />
                            ) : (
                                <p className="value">{productData.category}</p>
                            )}
                        </div>
                        <hr className="horizontal-line" />
                        <div className="quantity-container">
                            <button
                                type="button"
                                className="quantity-controller-button"
                                onClick={() => handleQuantityChange('decrement')}
                            >
                                <BsDashSquare className="quantity-controller-icon" />
                            </button>
                            <p className="quantity">{quantity}</p>
                            <button
                                type="button"
                                className="quantity-controller-button"
                                onClick={() => handleQuantityChange('increment')}
                            >
                                <BsPlusSquare className="quantity-controller-icon" />
                            </button>
                        </div>
                        <div>
                            <Button variant="primary m-2">ADD TO CART</Button>
                            {edit ? (
                                <Button variant="primary m-2" onClick={onSaveProductDetails}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="danger m-2" onClick={onDeleteProduct}>
                                    DELETE PRODUCT
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // function to display view based on api status
    const renderApiViews = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderSuccessView();
            case apiStatusConstants.failure:
                return renderFailureView();
            case apiStatusConstants.inProgress:
                return renderLoadingView();
            default:
                return null;
        }
    };

    return (
        <div className="product-item-details-container bg-body-tertiary">
            {renderApiViews()}
        </div>
    );
};

export default ProductDetails;
