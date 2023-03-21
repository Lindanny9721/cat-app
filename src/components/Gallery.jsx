// import "../style/Gallery.css"
const Gallery = ({ images } ) => {
    return (
        <div className="left-container">
            <h3>Previous Images:</h3>
            <ul>
            {images && images.length > 0 ? (
                images.map((pic, index) => {
                    return (
                        <li key={index}>
                            <img src = {pic.url} alt = "random cat pic" width="70" height="70"/>
                            <h4>A {pic.breeds[0].name} from {pic.breeds[0].origin}</h4>
                        </li>
                        
                    )
                })
            ) : (
                <div>
                    <h3>No Images yet!</h3>
                </div>
            )}
            </ul>
        </div>
    )
}
export default Gallery
