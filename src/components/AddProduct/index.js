import axios from 'axios';
import { React, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-hot-toast'; // display result of an action to user
import uploadFile from '../../middlewares/uploadPhotoCloudnary'; // function to upload file in cloudinary
import "./index.css";

const AddProduct = (props) => {
    // state hooks to manage the product data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [isFileUploading, setFileUploadingStatus] =useState(false)
    const [image, setImage] = useState("https://www.nfctogo.com/images/empty-img.png");

    const {handleAddProductToggle} = props

    // Toggle to add protuct and home
    const handleCancelAddProduct = () => {
        handleAddProductToggle() // toggle to display home and add product routes
    };

    //event handlers for updating state on input changes
    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value);
    const handlePrice = (event) => setPrice(event.target.value);
    const handleTags = (event) => setTags(event.target.value);
    const handleCategory = (event) => setCategory(event.target.value);

    // Function to handle image upload to Cloudinary
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setFileUploadingStatus(true)
        if (file) {
            try {
                const uploadPhoto = await uploadFile(file);
                setImage(uploadPhoto.secure_url || uploadPhoto.url);
                toast.success("Image successfully uploaded")
                setFileUploadingStatus(false)
            } catch (error) {
                console.error("Error uploading photo:", error);
                toast.error(error?.response?.data?.message ||"Error uploading photo.");
            }
        }
    };

    // Function to handle form submission and product creation
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description || !price || !category) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const productData = {
            title,
            description,
            price,
            tags,
            category,
            image,
        };

        try {
            const response = await axios.post("https://maxah-backend.onrender.com/api/add-product", productData);
            toast.success(response?.data?.message || "Product added successfully!");

            setTitle("");
            setDescription("");
            setPrice("");
            setTags("");
            setCategory("");
            setImage("https://www.nfctogo.com/images/empty-img.png");
            handleAddProductToggle()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error adding product.");
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className='add-product-container mt-4'>
            {/* Bootstrap form to handle product details input */}
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formGridTitle" className='mb-2'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleTitle}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={handleDescription}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={handlePrice}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={handleCategory}
                            required
                        >
                            <option value="">Select</option>
                            <option>electronics</option>
                            <option>men's clothing</option>
                            <option>jewelry</option>
                            <option>women's clothing</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            type="text"
                            value={tags}
                            onChange={handleTags}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <div>
                    {/*conditionally displaying button based on upload file status */}
                    <Button variant="primary" type="submit" disabled = {isFileUploading ?  true : false}>
                        {isFileUploading ?  "Uploading" : "Add"}
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        className="m-2"
                        onClick={handleCancelAddProduct}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProduct;
