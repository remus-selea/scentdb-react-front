import { Link } from "react-router-dom";

function CompanyCard(props) {
    const { company } = props;

    // console.log("company in CompanyCard", company);
    return (

        <div className="grid-item">

            <Link className="thumbnail-link"
                to={{
                    pathname: "/companies/" + company.companyId,
                    state: { companyId: company.companyId }
                }}
            >
                <img className="card-image" src={company.imagePath} alt="company" />
            </Link>

            <div className="card-info">
                <Link className="card-link"
                    to={{
                        pathname: "/companies/" + company.companyId,
                        state: { companyId: company.companyId }
                    }}
                >
                    <div className="card-name">{company.name}</div>

                </Link>
            </div>
        </div>
    );
}

export default CompanyCard;
