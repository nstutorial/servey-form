import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Dashboard = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [surveyData, setSurveyData] = useState({
    servey_date: "",
    staffname: "",
    survey_area: "",
    feedback: "",
    latitude: "",
    longitude: "",
  });
  const [allSurveyData, setAllSurveyData] = useState([]);

  const getSurveyData = async () => {
    const allSurveyData = await axios.get("http://localhost:5000/servey");
    console.log(allSurveyData.data);
    setAllSurveyData(allSurveyData.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      getSurveyData();
    });
  }, []);

  useEffect(() => {
    setSurveyData({ latitude: latitude, longitude: longitude });
  }, [latitude, longitude]);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSurveyData({ ...surveyData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/servey/add-servey-data",
        surveyData
      );
      console.log(surveyData);
      alert("Survey Data Saved");
      getSurveyData();
      setSurveyData({
        survey_date: "",
        staffname: "",
        survey_area: "",
        feedback: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.log("error in sending Survey Form", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/servey/delete-servey/${id}`);
      getSurveyData();
      alert("deleted");
    } catch (error) {
      console.log("error in deleting survey", error.message);
    }
  };
 
  return (
    <>
      <div className="main_section form_container ">
        <div style={{ width: "40%" }}>
          <p style={{ width: "100%" }} className="input-as-label txt-rt">
            Survey Form
          </p>
          <div className="label-w" id="date">
            Date
          </div>
          <input
            type="date"
            id="doj"
            name="survey_date"
            onChange={handleChange}
          />
          <div className="label-w">Staff Name</div>
          <input
            type="text"
            id="staffname"
            name="staffname"

            onChange={handleChange}
          />
          <div className="label-w">Survey Area :</div>
          <textarea
            style={{ width: "185px", row: "5", height: "100px" }}
            type="textarea"
            id="area"
            name="survey_area"
            onChange={handleChange}
          ></textarea>
          <div className="label-w">Feedback :</div>
          <input
            type="text"
            id="feedback"
            name="feedback"
            onChange={handleChange}
          />
          <div className="label-w">latitude :</div>
          <input
            type="text"
            id="latitude"
            name="latitude"
            readOnly
            onLoad={handleChange}
            value={latitude}
          />
          <div className="label-w">Longitude :</div>
          <input
            type="text"
            id="Longitude"
            name="Longitude"
            readOnly
            onLoad={handleChange}
            value={longitude}
          />
          <input
            style={{ width: "180px" }}
            type="submit"
            onClick={handleSubmit}
          />
        </div>
        <div style={{ background: "#f1f1f1", width: "60%" }}>
          <p className="input-as-label txt-rt txt-mddle">
            {" "}
            Your Current Location
          </p>
          {latitude && longitude ? (
            <>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d114033.31764448129!2d86.3952861!3d26.7271012!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1665303285621!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: "0", alignItems: "center" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </>
          ) : (
            <>
              <p>Loaction not updated</p>
            </>
          )}
        </div>
        <div id="demo"></div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Survey Date</th>
              <th>Staff Name</th>
              <th>Survey Area</th>
              <th>Feedback</th>
              <th>Last Follow-Up</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSurveyData &&
              allSurveyData.map((survy_data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{survy_data.survey_date}</td>
                  <td>{survy_data.staffname}</td>
                  <td>{survy_data.survey_area}</td>
                  <td>{`${survy_data.feedback.map((e)=>
                    e.remark
                    )}`}</td>
                  <td>Follow</td>

                  <td style={{ "fontWeight": "800" }}>
                    <span
                      style={{ "paddingRight": "5px", color: "red" }}
                    >{`${survy_data.position.map(e=>e.latitude)}`}</span>
                    ,<br />
                    {`${survy_data.position.map(e=>e.longitude)}`}
                  </td >
                  <td style={{"textAlign":"center"}}>
                    <button><GrView/></button>&nbsp;
                    <button onClick={() => handleDelete(survy_data._id)}>
                      <MdDelete />
                    </button>                 
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
