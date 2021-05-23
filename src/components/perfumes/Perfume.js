import "./Perfume.scss"

function Perfume(props) {
    return (
     
    <div className="grid-item">
        
        <a className="thumbnail-link" href="#abc">
            <img className="product-image" src="https://cdn.notinoimg.com/mailing/yves-saint-laurent/yslblow_aedp10_02-o__17.jpg" alt="perfume image" />
        </a>
        
        <div className="product-info">
            <a className="product-link" href="#" >
                <div className="product-name">Black Opium</div>
                <div className="product-brand">Yves Saint Laurent</div>
            </a>
        </div>
    </div>
    
    
    );
}
  
export default Perfume;
  