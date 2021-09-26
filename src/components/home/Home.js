import { Divider } from 'primereact/divider';
import './Home.scss'

function Home(props) {

  const renderNotice = () => {
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {
      return (
        <div>
          <Divider />

          <h2 className="error">Important notice</h2>
          <p className="margin-top--sm"> The true functionality of the application is lost due to the API calls being <b>mocked</b>. The application on this page is therefore<b> only meant as a showcase</b>.
            If you wish to see the application in its full capacity, you'll need to set up the react application and the accompanying backend on your system. </p>
          <p className="margin-top--sm"> <a href="https://github.com/remus-selea/scentdb-ui">On the git repository page</a> you may find guidelines for setting up this react application locally.  </p>
          <p className="margin-top--sm"> Instructions on how set up the ScentDB backend locally can be found on the <a href="https://github.com/remus-selea/scentdb"> corresponding git repository page.</a> </p>

        </div>
      );
    }
  }

  return (

    <div className="container">

      <div className="home-container">
        <h1 className="heading">Welcome to ScentDB!</h1>

        {renderNotice()}
        <Divider />

        <div className="details-container">
          <div className="panel">
            <h3 className="panel-title">An encyclopedia of perfumes</h3>
            <p className="panel-description"> The application was built with the goal of serving as a perfume encyclopedia, complete with notes, perfumers, and brands. </p>
            <img className="panel-image margin-top" alt="row of perfumes" src="/mocks/images/other/perfumes.jpg" />
            <img className="panel-image margin-top" alt="row of notes" src="/mocks/images/other/notes.jpg" />
            <img className="panel-image margin-top" alt="row of brands" src="/mocks/images/other/brands.jpg" />
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Fast and powerful fuzzy search</h3>
            <p className="panel-description"> Fuzzy search helps find relevant results even if the search terms are misspelled. The search is fast and scalable due to the usage of elasticsearch, a popular open source search engine. </p>
            <img className="panel-image margin-top" alt="fuzzy search explained" src="/mocks/images/other/fuzzy-search.jpg" />
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Faceted search and sorting</h3>
            <p className="panel-description"> Use the filters and the sort order dropdown to narrow down your search results and find the scent you're looking for. </p>
            <img className="margin-top" alt="filters and sorting" src="/mocks/images/other/filter-and-sort.jpg" />
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Video of oauth2 login in action</h3>
            <video src="https://user-images.githubusercontent.com/58348422/134821766-c221685a-d06e-4d28-aa24-70379693902a.mp4" data-canonical-src="https://user-images.githubusercontent.com/58348422/134821766-c221685a-d06e-4d28-aa24-70379693902a.mp4" controls="controls" muted="muted" className="d-block rounded-bottom-2 width-fit">
            </video>
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Video of elasticsearch fuzzy search in action</h3>
            <video src="https://user-images.githubusercontent.com/58348422/134822059-4c5b65f8-fc34-4327-87b0-66d8e8402bc8.mp4" data-canonical-src="https://user-images.githubusercontent.com/58348422/134822059-4c5b65f8-fc34-4327-87b0-66d8e8402bc8.mp4" controls="controls" muted="muted" className="d-block rounded-bottom-2 width-fit">
            </video>
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Video showcasing the filtering functionality</h3>
            <video src="https://user-images.githubusercontent.com/58348422/134822199-b113dc11-1e31-43c3-a6ba-48fb2d16cdf0.mp4" data-canonical-src="https://user-images.githubusercontent.com/58348422/134822199-b113dc11-1e31-43c3-a6ba-48fb2d16cdf0.mp4" controls="controls" muted="muted" className="d-block rounded-bottom-2 width-fit" >
            </video>
          </div>
        </div>

        <div className="details-container margin-top">
          <div className="panel">
            <h3 className="panel-title">Video showcasing the sorting functionality</h3>
            <video src="https://user-images.githubusercontent.com/58348422/134822282-67682e1f-7a7e-45ea-9838-3bb0120f8e2a.mp4" data-canonical-src="https://user-images.githubusercontent.com/58348422/134822282-67682e1f-7a7e-45ea-9838-3bb0120f8e2a.mp4" controls="controls" muted="muted" className="d-block rounded-bottom-2 width-fit">
            </video>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;