import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

const NewProductForm = (props) => {

    const initial = {
        name: "",
        category: 1,
        image: "",
        price: 0,
        countInStock: 0,
        brand: "",
        rating: 0,
        numReviews: 0,
        description: ""
    }
    const [form, setForm] = useState(initial);


    const handleAdd = async (e) => { //post request adds something to the database.
        e.preventDefault();
        console.log(form);
        try {
            const { data } = await axios.post("http://localhost:5000/api/ProductsInfo", form)
            console.log(data)
            setForm({
                ...initial

            });
            alert("Item added successfully")

        } catch (err) {
            console.log("Can Not Add object");
        }

    }
    console.log(props.newProduct);

    console.log(props);
    return (
        <div>
            <Link to="/">Back to Home</Link>

            <div id="form_id" className='formContainer'>
                <h2 className="title">Add New Product: </h2>

                <form >
                    <br />
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="name">Name:</label>
                            </td>
                            <td>
                                <input type="text" id="name" name="name" size="30px" placeholder="Enter product name" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="fcategory">Category:</label>
                            </td>
                            <td>
                                <select id="fcategory" value={form.category} onChange={(e) => { setForm({ ...form, category: e.target.value }) }}>
                                    <option defaultValue>Open this select menu</option>
                                    <option value="1">Tech</option>
                                    <option value="2">Basics</option>
                                    <option value="3">Home decor</option>
                                    <option value="3">Spa</option>
                                    <option value="3">Fashion</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="furl">Photo URL:</label>
                            </td><td>
                                <input type="text" id="furl" name="furl" size="30px" placeholder="Enter product photo url" value={form.image} onChange={(e) => { setForm({ ...form, image: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fprice">Price:</label>
                            </td><td>
                                <input type="number" id="fprice" name="fprice" placeholder="Enter product price" value={form.price} onChange={(e) => { setForm({ ...form, price: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fquantity">Quantity:</label>
                            </td><td>
                                <input type="number" id="fStock" name="fStock" placeholder="Enter product quantity" value={form.countInStock} onChange={(e) => { setForm({ ...form, countInStock: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fbrand">Brand:</label>
                            </td><td>
                                <input type="text" id="fbrand" name="fbrand" size="30px" placeholder="Enter product brand" value={form.brand} onChange={(e) => { setForm({ ...form, brand: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fRaiting">Raiting:</label>
                            </td><td>
                                <input type="number" id="fRaiting" size="30px" name="fRaiting" placeholder="Enter product raiting" value={form.rating} onChange={(e) => { setForm({ ...form, rating: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fReviews">No. Reviews:</label>
                            </td><td>
                                <input type="number" id="fReviews" name="fReviews" placeholder="Enter Number Reviews" value={form.numReviews} onChange={(e) => { setForm({ ...form, numReviews: e.target.value }) }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="fdesc">Description:</label>
                            </td><td>
                                <input type="text" id="fdesc" name="fdesc" placeholder="Enter product description" value={form.description} onChange={(e) => { setForm({ ...form, description: e.target.value }) }} />
                            </td>
                        </tr>
                    </table>

                    <span><button type="submit" className="form_button" onClick={(e) => handleAdd(e)}>Submit</button></span>
                    <span><button type="reset" className="form_button">Cancel</button></span>
                </form>
            </div>
        </div >

    )
}

export default NewProductForm;
