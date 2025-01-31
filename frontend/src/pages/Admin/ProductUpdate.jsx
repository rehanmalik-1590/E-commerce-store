import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const ProductUpdate = () => {
    const params = useParams();
    
    const { data: productData } = useGetProductByIdQuery(params._id);
    
    
    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);
    
    const navigate = useNavigate();

    const { data: categories = [] } = useFetchCategoriesQuery();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.categories?._id);
            setQuantity(productData.setQuantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.countInStock);
        }
    }, [productData]);


    const uploadFileHandler = async (e) => {
        formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Item added successfully");
            setImage(res.image);
        } catch (error) {
            toast.error("Item added successfully");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);

            const {data} = await updateProduct({productId: params._id, formData});

            if(data.error)
            {
                toast.error(data.error);
            }
            else
            {
                toast.success(`Product successfully updated`);
                navigate('/admin/allproductslist');
            }

        } catch (error) {
            console.log(error);
            toast.error("Product update failed. Try again");
        }
    }

    const handleDelete = async () => 
    {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");

            if(!answer) return;

            const {data} = await deleteProduct(params._id);
            toast.success(`${data.name} is deleted`);
            navigate('/admin/allproductslist');
        } catch (error) {
            console.log(error);
            toast.error("Delete failed. Try again");
        }
    }
return (
    <>
        <div className="container xl:mx-[5rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="w-full md:w-3/4 p-3">
                <div className="text-lg font-bold mb-4 text-white">Update / Delete Product</div>

                {image && (
                <div className="text-center mb-4">
                    <img
                    src={image}
                    alt="product"
                    className="block mx-auto max-h-[200px]"
                    />
                </div>
                )}

                <div className="mb-6">
                <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11"
                >
                    {image ? image.name : "Upload image"}
                    <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="text-white"
                    />
                </label>
                </div>

                <div className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="block mb-2 text-white">
                    <label htmlFor="name">Name</label> <br />
                    <input
                        type="text"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>

                    <div className="block mb-2 text-white">
                    <label htmlFor="name block">Price</label> <br />
                    <input
                        type="number"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                </div>

                <div className="block mb-2 text-white">
                    <div>
                    <label htmlFor="name block">Quantity</label> <br />
                    <input
                        type="number"
                        min="1"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="name block" className="block mb-2 text-white">Brand</label> <br />
                    <input
                        type="text"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    </div>
                </div>
                <div className="mb-6">
                <label htmlFor="" className="block mb-2 text-white">
                    Description
                </label>
                <textarea
                    type="text"
                    className="p-4 w-full bg-[#3d3d3e] text-white border rounded-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                    <label htmlFor="name block" className="block mb-2 text-white">Count In Stock</label> <br />
                    <input
                        type="text"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    </div>

                    <div>
                    <label htmlFor="" className="block mb-2 text-white">Category</label> <br />
                    <select
                        placeholder="Choose Category"
                        className="p-4 w-full border rounded-lg bg-[#3d3d3e] text-white"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

                <div className="">
                    <button
                    onClick={handleSubmit}
                    className="py-4 px-6 sm:px-10 mt-5 rounded-lg text-lg font-bold bg-blue-600 text-white w-full sm:w-auto"
                    >
                    Update
                    </button>
                    <button
                    onClick={handleDelete}
                    className="py-4 px-6 sm:px-10 mt-5 ml-10 rounded-lg text-lg font-bold bg-pink-600 text-white w-full sm:w-auto"
                    >
                    Delete
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
);
};

export default ProductUpdate;
