import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { GET_PERFUME_BY_ID_URL, TOP_NOTES, MIDDLE_NOTES, BASE_NOTES, PERFUME_TYPES } from '../../util/constants';
import axiosApiCall from '../../util/axiosService'
import CarouselSlider from '../carousel/CarouselSlider';
import RatingComponent from '../RatingComponent'

import { ReactComponent as WishIcon } from '../../assets/icons/wish.svg';
import { ReactComponent as OwnIcon } from '../../assets/icons/own.svg';
import { ReactComponent as WearIcon } from '../../assets/icons/wear.svg';
import { Panel } from 'primereact/panel';
import StoresPanel from './StoresPanel';
import DOMPurify from "dompurify";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "./PerfumeDetails.scss"
import Reviews from '../review/Reviews';

function PerfumeDetails(props) {
  const location = useLocation();
  const { perfumeId } = location.state;
  const [data, setData] = useState(null);
  const [baseNotes, setBaseNotes] = useState([]);
  const [topNotes, setTopNotes] = useState(null);
  const [middleNotes, setMiddleNotes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosApiCall(GET_PERFUME_BY_ID_URL + perfumeId, 'get',);
      setData(result);

      result.perfumes[0].perfumeNotes.forEach(perfumeNote => {
        if (perfumeNote.type === BASE_NOTES) {
          let baseNoteArr = [];
          perfumeNote.notes.forEach(noteId => baseNoteArr.push(result.notes[noteId]));
          setBaseNotes(baseNoteArr);
        }

        if (perfumeNote.type === MIDDLE_NOTES) {
          let middleNoteArr = [];
          perfumeNote.notes.forEach(noteId => middleNoteArr.push(result.notes[noteId]));
          setMiddleNotes(middleNoteArr);
        }

        if (perfumeNote.type === TOP_NOTES) {
          let topNotArr = [];
          perfumeNote.notes.forEach(noteId => topNotArr.push(result.notes[noteId]));
          setTopNotes(topNotArr);
        }

      });

    };
    fetchData();
  }, [perfumeId]);


  const renderPerfumeType = () => {
    return (
      Object.entries(PERFUME_TYPES).map(
        ([key, value]) => {
          if (key == data.perfumes[0].perfumeType) {
            return <span> {value}</span>;
          }
        }

      )
    )
  }

  let emptyResult = (data == null || (data.perfumes.length < 1 || data.perfumes === undefined));
  let hasBaseNotes = (baseNotes != null);
  let hasMiddleNotes = (middleNotes != null);
  let hasTopNotes = (topNotes != null);

  return (
    <div className="container mt-7">
      <div className="perfume-side-content">
        {!emptyResult &&
          <CarouselSlider perfume={data.perfumes[0]} />
        }

        <div className="perfume-content">
          {!emptyResult &&
            <header className="perfume-details-headings">
              <h1 className="perfume-name"> {data.perfumes[0].title}</h1>
              <h2 className="perfume-brand"> {data.perfumes[0].brand}</h2>
            </header>
          }

          <RatingComponent readonly={true} showCount={true} />

          <div className="perfume-details-actions">
            <div className="perfume-action wishlist-action">
              <WishIcon className="action-icon" />
              <div className="action-name">WISH</div>
              <div className="action-count">53</div>
            </div>
            <div className="perfume-action own-action">
              <WearIcon className="action-icon" />
              <div className="action-name">WEAR</div>
              <div className="action-count">21</div>
            </div>
            <div className="perfume-action wear-action">
              <OwnIcon className="action-icon" />
              <div className="action-name">OWN</div>
              <div className="action-count">86</div>
            </div>
          </div>

          <StoresPanel />
        </div>

      </div>


      <div className="perfume-details">
        <div className="divider "> </div>

        <Panel header="About">

          {!emptyResult &&

            <table>
              <tbody>

                <tr>
                  <th className="about-heading">Launch Year</th>
                  <td className="about-data">{data.perfumes[0].launchYear}</td>
                </tr>

                <tr>
                  <th className="about-heading">Gender</th>
                  <td className="about-data">{data.perfumes[0].gender}</td>
                </tr>


                <tr>
                  <th className="about-heading">Type</th>
                  <td className="about-data"> {renderPerfumeType()}</td>
                </tr>


                <tr>
                  <th className="about-heading">Bottle Sizes</th>
                  <td className="about-data">{data.perfumes[0].bottleSizes}</td>
                </tr>

                <tr>
                  <th className="about-heading">Top Notes</th>
                  <td className="about-data">
                    {hasTopNotes &&
                      topNotes.map((topNote, index) => <span key={index}>{topNote.name}{index < topNotes.length - 1 ? ', ' : ''}</span>)
                    }
                  </td>
                </tr>

                <tr>
                  <th className="about-heading">Middle Notes</th>
                  <td className="about-data">
                    {hasMiddleNotes &&
                      middleNotes.map((middleNote, index) => <span key={index}>{middleNote.name}{index < middleNotes.length - 1 ? ', ' : ''}</span>)
                    }
                  </td>
                </tr>

                <tr>
                  <th className="about-heading">Base Notes</th>
                  <td className="about-data">
                    {hasBaseNotes &&
                      baseNotes.map((baseNote, index) => <span key={index}>{baseNote.name}{index < baseNotes.length - 1 ? ', ' : ''}</span>)
                    }
                  </td>
                </tr>
              </tbody>

            </table>
          }
        </Panel>
        <div className="divider "> </div>

        {!emptyResult &&
          <Panel header="Description">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.perfumes[0].description) }} />
          </Panel>
        }

        <div className="divider "> </div>

        <Panel header="Reviews">
          <Reviews />
        </Panel>

      </div>


    </div>


  );
}

export default PerfumeDetails;
