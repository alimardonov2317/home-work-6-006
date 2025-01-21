import React from 'react'
import { BsX } from "react-icons/bs";
import "../products/Products.css"

const ProductModal = ({ oneItem, setOneItem }) => {
    return (
        <>
            <div onClick={() => setOneItem(null)} className='modal'></div>
            <div className='modal__item '>
                <img src={oneItem.thumbnail} alt="" />
                <div>
                    <h2 className='modal__title'>{oneItem.title}</h2>
                    <p className='modal__price'>{oneItem.price}$</p>
                    <p>{oneItem.description}</p>
                    <button className='modal__btn'>Buy now</button>
                </div>
                <button className='exit' onClick={() => setOneItem(null)}><BsX /></button>
            </div>
        </>
    )
}

export default ProductModal