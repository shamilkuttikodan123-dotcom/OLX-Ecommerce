import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateproduct } from '../features/products/productsSlice'
import './edit.css'

const API_URL ="http://127.0.0.1:8000/api";

const EditProduct = () => {

    const { id } = useParams()
    const navigate=useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [fetchLoading, setFetchLoading] = useState(true)
    const [fetchError, setFetchError] = useState(null)

    const dispatch = useDispatch()

    const {loading,error} = useSelector(
        (state) => state.products
    )

    useEffect(() => {

        const fetchProduct = async () => {

            const access = localStorage.getItem("access")

            try {
                const response = await fetch(
                    `${API_URL}/products/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    setFetchError(data)
                    return
                }

                setTitle(data.title)
                setDescription(data.description)
                setPrice(data.price)
                setCategory(data.category)
                setImageUrl(data.image_url)

            } catch (error) {
                setFetchError({
                    error: "Network error"
                })
            } finally {
                setFetchLoading(false)
            }
        }

        fetchProduct()

    }, [id])

    if (fetchLoading) {
        return <p>Loading product...</p>
    }

    if (fetchError) {
        return <p>Failed to load product.</p>
    }

    const handleSubmit =async (e) => {
        e.preventDefault()

        const productData = {
            title,
            description,
            price,
            category,
            image_url: imageUrl,
        }

    try{
        await dispatch(
            updateproduct({
                id,
                productData,
            })
        ).unwrap()
        navigate('/')
    }catch(error){
        console.log(error)

    }
}

    return (
        <div className="edit-product-page">
            <h1>Edit Product</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="furniture">Furniture</option>
                    <option value="books">Books</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="other">Other</option>
                </select>

                <br /><br />

                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <br /><br />

                {loading && <p>Updating product...</p>}

                {error && <p>Failed to update product.</p>}

                <button type="submit">
                    Update Product
                </button>
                <button onClick={()=>navigate('/')}>
                    Cancel
                </button>

            </form>
                </div>
            )
        }

export default EditProduct