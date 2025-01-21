import React, { useEffect, useState } from 'react'
import { request } from '../../api'
import "./Products.css"
import Loading from '../loading/Loading'
import ProductModal from './product-modal'

const Products = () => {
    const limit = 10
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)
    const [categories, setCategories] = useState(null)
    const [oneItem, setOneItem] = useState(null)


    useEffect(() => {
        request
            .get("/products/category-list")
            .then(res => {
                setCategories(["all", ...res.data])
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        request
            .get("/products", {
                params: {
                    limit,
                    skip: count * limit
                }
            })
            .then(res => {
                setProducts([...products, ...res.data.products])
                setTotal(res.data.total)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [count])

    return (
        <div className='container'>
            <ul className="collection">
                {
                    categories?.map((item) => (
                        <li key={item} className='collection__item'>{item}</li>
                    ))
                }
            </ul>
            <div className="wrapper">
                {
                    products?.map((product) => (
                        <div key={product.id} className="card">
                            <img onClick={() => setOneItem(product)} src={product.thumbnail} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>${product.price} USD</p>
                            <button onClick={() => setOneItem(product)} className="buy__btn">Buy now</button>
                        </div>
                    ))
                }
            </div>
            {
                loading && <Loading count={limit} />
            }
            {
                total > limit * (count + 1) &&
                <button onClick={() => setCount(count + 1)} className="btn__seemore">See more</button>
            }
            {
                oneItem &&
                <ProductModal oneItem={oneItem} setOneItem={setOneItem} />
            }

        </div>
    )
}

export default Products