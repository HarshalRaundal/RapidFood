import React from 'react'

const Carousel = () => {
    return (
        <div>
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
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        <button className="btn btn-dark col-2" >Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Carousel