import { useState } from "react";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Model from "../../components/Model";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery();
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modelVisible, setModelVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Category name is required");
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} is created.`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Create category failed. Try again");
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!updatingName) {
            toast.error("Category name is required");
            return;
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: { name: updatingName },
            }).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);
                setSelectedCategory(null);
                setUpdatingName("");
                setModelVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is deleted`);
                setSelectedCategory(null);
                setModelVisible(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Category deletion failed. Try again");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Admin Menu */}
            <div className="w-full md:w-3/4 lg:w-1/2 mb-4">
                <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 lg:w-1/2 p-4 rounded-lg shadow-md">
                <div className="text-lg font-semibold text-center mb-4">Manage Categories</div>
                
                {/* Category Form */}
                <CategoryForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory}
                />

                <hr className="my-4" />

                {/* Categories List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories?.map((category) => (
                        <button
                            key={category._id}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={() => {
                                setModelVisible(true);
                                setSelectedCategory(category);
                                setUpdatingName(category.name);
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Modal */}
                <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
                    <CategoryForm
                        value={updatingName}
                        setValue={(value) => setUpdatingName(value)}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Model>
            </div>
        </div>
    );
};

export default CategoryList;
