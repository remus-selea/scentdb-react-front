import { Link } from "react-router-dom";
import "./GridCard.scss"

function PerfumeCard(props) {
    const { perfume } = props;

    return (
        <div className="grid-item">

            <Link className="thumbnail-link"
                to={{
                    pathname: "/perfumes/" + perfume.perfumeId,
                    state: { perfumeId: perfume.perfumeId }
                }}
            >
                <img className="card-image" src={perfume.images[0]?.imagePath} alt="perfume" />
            </Link>

            <div className="card-info">
                <Link className="card-link"
                    to={{
                        pathname: "/perfumes/" + perfume.perfumeId,
                        state: { perfumeId: perfume.perfumeId }
                    }}
                >
                    <div className="card-name">{perfume.title}</div>
                    <div className="card-brand">{perfume.brand}</div>

                </Link>
            </div>
        </div>
    );
}

export default PerfumeCard;
