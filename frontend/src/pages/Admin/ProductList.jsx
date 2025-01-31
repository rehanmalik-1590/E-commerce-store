import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation
} from "../../redux/api/productApiSlice";

import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const {data : categories} = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("brand", brand);
            productData.append("countInStock", stock);

            const {data} = await createProduct(productData);

            if(data.error)
            {
                toast.error("Product create failed. Try again");
            }
            else
            {
                toast.success(`${data.name} is created`);
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            toast.error("Product create failed. Try again");
        }
    };
    
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
                <div className="container xl:mx-[5rem] sm:mx-[0]">
                <div className="flex flex-col md:flex-row">
                {<AdminMenu />}
                <div className="w-full md:w-3/4 p-3">
                    <h2 className="text-lg font-bold mb-4 text-white">Create Product</h2>
                    {imageUrl && (
                        <div className="text-center mb-4">
                            <img 
                                src={imageUrl} 
                                alt="product" 
                                className="block mx-auto max-h-[200px]" 
                            />
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label 
                            className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload image..."}
                            <input 
                                type="file"
                                name="image"
                                accept="image/*"
                                className="hidden"
                                onChange={uploadFileHandler} 
                            />
                        </label>
                    </div>

                    {/* Form Fields */}
                    <div className="p-3">
                        {/* Fields in a Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-white">Name</label>
                                <input 
                                    type="text"
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-white">Price</label>
                                <input 
                                    type="number"
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-white">Quantity</label>
                                <input 
                                    type="number"
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor="brand" className="block mb-2 text-white">Brand</label>
                                <input 
                                    type="text"
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)} 
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block mb-2 text-white">Description</label>
                            <textarea
                                className="p-4 w-full bg-[#3d3d3e] text-white border rounded-lg"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Count In Stock and Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="stock" className="block mb-2 text-white">Count In Stock</label>
                                <input 
                                    type="text" 
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>  
                            <div>
                                <label htmlFor="category" className="block mb-2 text-white">Category</label>
                                <select 
                                    className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories?.length > 0 ? (
                                        categories.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No categories available</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <button 
                        onClick={handleSubmit}
                        className="py-4 px-6 sm:px-10 mt-5 rounded-lg text-lg font-bold bg-blue-600 text-white w-full sm:w-auto"
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList