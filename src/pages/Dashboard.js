import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [latitude, setLatitude]=useState('');
  const [longitude,setLongitude]=useState('');
  const [user, setUser]=useState({date:"",staffname:"",area:"",feedback:"",lat1:"",long1:""})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position=>{
      console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      
     }));
   
  }, []);
  useEffect(()=>{
  setUser({lat1:latitude,long1:longitude}) 

  },[latitude,longitude]);

let name, value
const handleChange = (e)=>{
  name= e.target.name;
  value=e.target.value
  setUser({...user,[name]:value});  
}

const handleSubmit=(e)=>{
e.preventDefault();
try {
axios.post("http://localhost:5000/survey",user);
console.log(user);

} catch (error) {
  console.log("error in sending Survey Form",error);
}
 }
  // const handleError =(error)=>{
    
  //     switch(error.code) {
  //       case error.PERMISSION_DENIED:
  //         x.innerHTML = "User denied the request for Geolocation."
  //         break;
  //       case error.POSITION_UNAVAILABLE:
  //         x.innerHTML = "Location information is unavailable."
  //         break;
  //       case error.TIMEOUT:
  //         x.innerHTML = "The request to get user location timed out."
  //         break;
  //       case error.UNKNOWN_ERROR:
  //         x.innerHTML = "An unknown error occurred."
  //         break;
  //         default:
  //           x.innerHTML ="An unknkwon error occured"
   
  //   }
  // }
  
  //   var x = document.getElementById("demo");
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  //   alert("hi-1");
  // };

  // function showPosition(position) {
  //   alert("hi-2");
  //   // x.innerHTML = "Latitude: " + position.coords.latitude +
  //   // "<br>Longitude: " + position.coords.longitude;
  //   document.getElementById("lat1").value = position.coords.latitude;
  //   document.getElementById("long1").value = position.coords.longitude;
  //   alert("hi-3");
  // }

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
          <input type="date" id="doj" name="date" onChange={handleChange} />
          <div className="label-w">Staff Name</div>
          <input type="text" id="staffname" name="staffname" onChange={handleChange} />
          <div className="label-w">Surver Area :</div>
          <textarea
            style={{ width: "185px", row: "5", height: "100px" }}
            type="textarea"
            id="area"
            name="area"
            onChange={handleChange}
          ></textarea>
          <div className="label-w">Feedback :</div>
          <input type="text" id="feedback" name="feedback" onChange={handleChange}/>
          <div className="label-w">latitude :</div>
          <input type="text" id="lat1" name="lat1" readOnly onLoad={handleChange} value={latitude} />
          <div className="label-w">Longitude :</div>
          <input type="text" id="long1" name="long1" readOnly onLoad={handleChange} value={longitude}  />
          <input
            style={{ width: "180px" }}
            type="submit"
            onClick={handleSubmit}
          />
        </div>
        <div style={{ background: "#f1f1f1", width: "60%" }}>
          <p className="input-as-label txt-rt txt-mddle"> Your Current Location</p>
          <p>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d114033.31764448129!2d88.3952861!3d26.7271012!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1665303285621!5m2!1sen!2sin"
              width="95%"
              height="450"
              style={{border:"0",alignItems:"center"}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </p>
          {
            latitude && longitude ?
            <>
           <iframe 
              title="map"             
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d114033.31764448129!2d88.3952861!3d26.7271012!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1665303285621!5m2!1sen!2sin"
              
              width="100%"
              height="450"
              style={{border:"0",alignItems:"center"}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            </>           
            :
          <>
          <p>Loaction not updated</p>
          </>
          }
        </div>
        <div id="demo"></div>
      </div>
    </>
  );
};

export default Dashboard;
