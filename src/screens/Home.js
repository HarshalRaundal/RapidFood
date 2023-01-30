import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navigationbar from '../components/Navbar'

export const Home = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [foodCategories, setFoodCategories] = useState([]);
    const [searchText , setSearchText] = useState('');

    const loadData = async () => {
        let foodData = await fetch("http://localhost:5000/api/getData",

            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

        foodData = await foodData.json();
        // console.log("FOOD DATA : ",foodData[1]);

        setFoodItems(foodData[0]);
        setFoodCategories(foodData[1]);

        // console.log(foodItems);
        // console.log(foodCategories);
    }

    useEffect(() => {
        loadData()
    }, []);



    return (
        <div >
            <Navigationbar />

            {/* carousel */}
            
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: 'scale-down !important' }} >
                <div className="carousel-inner" style={{ maxHeight: '700px', filter: "brightness(30%)" }} >
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?cake" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>


                <div className="carousel-caption d-none d-md-block">
                    <form className="form-inline row justify-content-center">
                        <div className="col-6">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {setSearchText(e.target.value)}}/>
                        </div>
                        {/* <button className="btn btn-dark col-2" >Search</button> */}
                    </form>
                </div>
            </div>

    {/* carousel */}
            <span className='m-2  h-25' ></span>
            {
                foodCategories && foodCategories.map((data) => {

                    return (
                        <>
                            <div  key={data._id}>
                                <div  key={data._id} className='fs-3 text-start m-5'>
                                {data.CategoryName}
                                </div>
                                <hr />
                                <div className='container w-100'>
                                    <div className='m-2 row align-items-center w-100 '>
                                        {foodItems && foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchText.toLocaleLowerCase()))).map((item) => {
                                            return (

                                                <div key={item._id} className='col h-25 m-2 d-flex justify-content-center' >
                                                    <Card
                                                        foodItem ={item}
                                                        itemOptions={item.options[0]}
                                                    />
                                                </div>


                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                        </>)
                })
            }




            <Footer />
        </div>
    )
}
