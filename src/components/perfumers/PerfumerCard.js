import { Link } from "react-router-dom";

function PerfumerCard(props) {
    const { perfumer } = props;

    // console.log("perfumer in PerfumerCard", perfumer);
    return (

        <div className="grid-item">

            <Link className="thumbnail-link"
                to={{
                    pathname: "/perfumers/" + perfumer.perfumerId,
                    state: { perfumerId: perfumer.perfumerId }
                }}
            >
                <img className="card-image" src={perfumer.imagePath} alt="perfumer" />
            </Link>

            <div className="card-info">
                <Link className="card-link"
                    to={{
                        pathname: "/companies/" + perfumer.perfumerId,
                        state: { perfumerId: perfumer.perfumerId }
                    }}
                >
                    <div className="card-name">{perfumer.name}</div>

                </Link>
            </div>
        </div>
    );
}

export default PerfumerCard;
