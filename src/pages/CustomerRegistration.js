import React, { useState,useEffect } from "react";
import axios from "axios";
import {TiEdit,TiDelete} from 'react-icons/ti';
import Swal from "sweetalert2";

const url = "http://localhost:5000/user";

const CustomerRegistration = () => { 
  const [userdata, setUserdata]=useState([]);
  const [user, setUser] = useState({
    staffname:"",fathername:"",address:"",mobilenumber:"",adhar:"",email:"",doj:"",username:"",password:""
  });


  
  const getAllUser =()=>{
    try {
       axios.get(url)
       .then((res)=>{
        const users = res.data;
        console.log(users);
        setUserdata(users)       
       })
       
       .catch((error)=>{console.log(error);})
    } catch (error) {
      console.log(`error in getting userlist ${error}`);
    }
  }

  useEffect(() => {
    getAllUser();
    
  }, []);

  let name,value
  const handleInput = (e)=>{
    name= e.target.name;
    value=e.target.value
    setUser({...user,[name]:value});
    

  }
  const PostUserData = (e)=>{
    e.preventDefault();
    
    //object Destructuring
    const{staffname,fathername,address,mobilenumber,adhar,email,doj,username,password} = user;
    if(!staffname || !fathername || !address || !mobilenumber || !adhar || !email || !doj || !username || !password){
      Swal.fire({
        icon:"warning",
        text:"Plz fill All input field",
      })
      return;
    }
    axios.post(url + "/add-user",{staffname,fathername,address,mobilenumber,adhar,email,doj,username,password})
    .then((user)=>{
      console.log(user);
      getAllUser();
      Array.from(document.querySelectorAll("input")).forEach((input)=>{input.value=""});
      Swal.fire({
        icon: 'success',
        title: 'Data Store Successfully!',
        text: `${user.staffname} added Successfully`,
        footer: '<a href="">Why do I have this issue?</a>'
      })      
    })
    .catch((err)=>{
      console.log(err);
    })
  }
const handleDelete =(id,user)=>{
  let table = document.createElement("div");
  table.innerHTML =`
  <b>Staff Name : <span>${user.staffname}</span> </b><br/> username : <span>${user.username}</span>
  `

  Swal.fire({
    title: 'Are you sure?',
    //text: `You won't be able to revert this! <b> ${username}</b>`,
    //html: `You won't be able to revert this! <b> ${username}</b>`,
    html:table,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000080',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes,I want to delete!'
}).then((result) => {
    if (result.value) {
      axios.delete(url +`/delete-user/${id}`)
      .then((res)=>{
       console.log(res);
      
       getAllUser();
      })
      .catch((error)=>{console.log("error in delete")})
    }else{
      return;
    }
})
}
//edit functionality
const{staffname,fathername,address,mobilenumber,adhar,email,doj,username,password} = user;

const handleEdit =(id)=>{

  const filterData = userdata.filter((u)=>u._id ===id)
  //console.log(filterData);
  setUser({
  staffname:filterData[0].staffname,
  fathername:filterData[0].fathername,
  address:filterData[0].address,
  mobilenumber:filterData[0].mobilenumber,
  adhar:filterData[0].adhar,
  email:filterData[0].email,
  doj:filterData[0].doj,
  username:filterData[0].username,
  password:filterData[0].password,
  
  });
  //console.log(user);

 }
//end edit
const [toggle, setToggle] = useState(false);

    const toggleFunc = () => {
    setToggle(!toggle)
    
    console.log(toggle);
    }
  return (
    <>
      <h2 className="mb-20"> Staff Registration Page </h2>
      <hr />
      <div className="container">
        <div className="container-col">
        <div className="section-40">
          <form method="post" className="form_container">
          <div className="row">
            <label className="label">Staff Name :</label>
            <input type="text" placeholder="Member Name" id="staffname" name="staffname" value={staffname}  onChange={handleInput} required/>
            <label className="label">Father Name :</label> 
            <input type="text" placeholder="Member Name" id="fathername" name="fathername" value={fathername} onChange={handleInput} required/>           
            <label className="label">Address :</label>
            <input type="text" placeholder="address" id="address" name="address" value={address} onChange={handleInput} required/>
            <label className="label">Mobile Number :</label> 
            <input type="text" placeholder="Mobile Number" id="mobilenumber" name="mobilenumber" value={mobilenumber} onChange={handleInput} required/>        
            <label className="label">Adhar Number :</label> 
            <input type="text" placeholder="Adhar Number" id="adhar" name="adhar" value={adhar} onChange={handleInput} required/>  
            <label className="label">Email :</label> 
            <input type="text" placeholder="Email" id="email" name="email" value={email} onChange={handleInput} required/>       
          </div>
         
          <div className="row">
            <label className="label">Date of Joining :</label>
            <input type="date"  id="doj" name="doj" value={doj} onChange={handleInput} required/>
            <label className="label">User Name :</label> 
            <input type="text" placeholder="User Name" id="username" name="username" value={username} onChange={handleInput} required/>   
            <label className="label">Password:</label> 
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleInput} required/>                 
            <label className="label">Refference</label> 
            <input type="text" placeholder="Refference" id="refrence" name="refrence" onChange={handleInput} required/>                 
            <div className="row-flex">
            <input className="btn" type="submit" onClick={PostUserData}/>
            <input className="btn btn-red" type="reset"/>
          </div>
          </div>
          
          
         
          </form>
        </div>
        <div className="section-60">          
          <table>            
            <thead>              
              <tr>
              <th>Sl No </th>
              <th>Staff Name</th>              
              <th>Mobile No</th>
              {/* <th>Address</th> */}
              <th>Date of Joining</th>
              <th>User Name</th>
              <th>Password</th>
              <th>Action</th>
              </tr>             
            </thead>
            <tbody>
             {
              userdata && userdata.map((u,index)=>
              
              <tr key={index}>
                <td>{index+1} <span onClick={()=>{toggleFunc()}}>view</span></td>
                <td>{u.staffname}</td>
                <td>{u.mobilenumber}</td>
                {/* <td>{u.address}</td> */}
                <td>{u.doj}</td>
                <td>{u.username}</td>
                <td>{u.password}</td>
                <td>&nbsp;<span onClick={()=>{handleEdit(u._id)}}><TiEdit className="edit"/></span>&nbsp;<span onClick={()=>{handleDelete(u._id,u)}} ><TiDelete /></span> </td>
              </tr>
              )
             }
            </tbody>
          </table>
          
        </div>
        </div>
      </div>
    
    </>
  );
};

export default CustomerRegistration;
