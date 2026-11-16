import { useDispatch, useSelector } from 'react-redux'
import { addproduct } from '../features/products/productsSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './sellproducts.css'
import Navbar from '../components/Navbar';
function Sellproducts() {

    const {loading,error}=useSelector((state)=>state.products)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {register,handleSubmit: formSubmit,formState: { errors },} = useForm();

    const onSubmit = async (data) => {
        const productData = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image_url: data.imageUrl,
        };

    try {
        await dispatch(addproduct(productData)).unwrap();

        navigate("/");
        } catch (error) {
        console.error("Failed to add product:", error);
        }
  };

  return  (
    <div>
      <Navbar/>
    <div className="sell-page">
      <h1>Sell Product</h1>

      <form className="sell-form" onSubmit={formSubmit(onSubmit)}>
        {/* Title */}
        <label htmlFor="title">Title</label>
        <br />

        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />

        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}

        <br />
        <br />

        {/* Description */}
        <label htmlFor="description">Description</label>
        <br />

        <textarea
          id="description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />

        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}

        <br />
        <br />

        {/* Price */}
        <label htmlFor="price">Price</label>
        <br />

        <input
          id="price"
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
        />

        {errors.price && (
          <p className="error-message">{errors.price.message}</p>
        )}

        <br />
        <br />

        {/* Category */}
        <label htmlFor="category">Category</label>
        <br />

        <select
          id="category"
          {...register("category", {
            required: "Please select a category",
          })}
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="furniture">Furniture</option>
          <option value="books">Books</option>
          <option value="vehicles">Vehicles</option>
          <option value="other">Other</option>
        </select>

        {errors.category && (
          <p className="error-message">{errors.category.message}</p>
        )}

        <br />
        <br />

        {/* Image URL */}
        <label htmlFor="imageUrl">Image URL</label>
        <br />

        <input
        id="imageUrl"
        type="url"
        {...register("imageUrl", {
            pattern: {
            value: /^https?:\/\/\S+$/i,
            message: "Please enter a valid URL",
            },
        })}
        />

        {errors.imageUrl && (
          <p className="error-message">{errors.imageUrl.message}</p>
        )}

        <br />
        <br />

        {/* API status */}
        {loading && <p>Adding product...</p>}

        {error && <p>Failed to add product.</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Sell Product"}
        </button>
      </form>
    </div>

    </div>
  );
}

export default Sellproducts
