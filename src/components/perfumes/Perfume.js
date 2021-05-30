import "./Perfume.scss"
import { Link } from "react-router-dom";

function Perfume(props) {
    const { perfume } = props;

    // console.log(perfume);
    return (

        <div className="grid-item">

            <Link className="thumbnail-link"
                to={{
                    pathname: "/perfumes/" + perfume.perfumeId,
                    state: { perfumeId: perfume.perfumeId }
                }}
            >

                <img className="product-image" src={perfume.imgPath} alt="perfume image" />
            </Link>

            <div className="product-info">
                <Link className="product-link"
                    to={{
                        pathname: "/perfumes/" + perfume.perfumeId,
                        state: { perfumeId: perfume.perfumeId }
                    }}
                >
                    <div className="product-name">{perfume.title}</div>
                    <div className="product-brand">{perfume.brand}</div>

                </Link>
            </div>
        </div>
    );
}

export default Perfume;
