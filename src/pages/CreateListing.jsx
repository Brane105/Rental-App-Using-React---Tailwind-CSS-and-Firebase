/* eslint-disable default-case */
import React, { useState } from "react";
import Loading from "../components/Loading";
import {toast} from "react-toastify"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import { db } from "../firebase";
import {useNavigate} from "react-router-dom"
export default function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [geoLocationEnabled,setLocationEnabled] = useState(true);
  const [loading , setLoading]= useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const[formData ,setformData] = useState({
    type: "rent",
    name : "",
    bedrooms:1,
    bathrooms:1,
    parking:false,
    furnished:false,
    address:"",
    description:"",
    offer:false,
    price:0,
    discount :0,
    latitude : 0,
    longitude : 0,
    images:{}
    });
  const {type,name,bedrooms,bathrooms,parking,furnished,
    address,description,offer,price,discount,latitude,longitude,images} = formData;

  function onChange(e){
    console.log(e.target.value)
    let boolean = null; 
    if(e.target.value === 'true'){
        boolean = true;
    }
    if(e.target.value === 'false'){
        boolean = false;
    }
    console.log(boolean);
    //files 
    if(e.target.files){
        setformData((prevState)=>({
            ...prevState,
            images:e.target.files
        }));
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    //text/boolean/number
    if(!e.target.files){
      // setSelectedImage(null);
        setformData((prevState)=>({
            ...prevState,
            [e.target.id]:boolean ?? e.target.value
        }));
    }
  }
 async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    console.log(formData)
    if(+discount >= +price){
        setLoading(false);
        toast.error('Discounted price needs to be less than regular price.');
        return;
    }
    if(images.length > 6){
        setLoading(false);
        toast.error('Images Maximum is 6');
        return;
    }
    let geolocation = {};
    if(geoLocationEnabled){
        // const address = "1600 Amphitheatre Parkway, Mountain View, CA";
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                geolocation.lat = parseFloat(data[0].lat);
                geolocation.lng = parseFloat(data[0].lon);
                console.log("geolocation:", geolocation);
            } else {
              setLoading(false);
              setSelectedImage(null);
              toast.error("No location data found for the address try again.");
              return;
            }
          } else {
            setLoading(false);
            setSelectedImage(null);
            toast.error("API request failed.")
            return;
          }
    }
    else{
        geolocation.lat = latitude;
        geolocation.lng = longitude;
    }
    async function storeImage(image) {
      console.log(image)
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        console.log(filename)
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      setSelectedImage(null);
      toast.error("Images not uploaded");
      return;
    });
    console.log(imgUrls)
    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp:serverTimestamp()
    }
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discount;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    console.log(formDataCopy)
    const docRef = await addDoc(collection(db,"listings"),formDataCopy);
    setLoading(false);
    toast.success('Listing added successfully.');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }
 
  if(loading){
    return  <Loading/>
  }
  return (
    <main className="max-w-full px-2 ">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <div className="flex justify-center mt-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-5xl md:flex md:flex-row ">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-1/2 object-fit rounded"
              />
            ) : (
              <div className="w-full h-1/2 object-fit rounded bg-gray-200 flex items-center justify-center">
                No Image
              </div>    
            )}
          </div>
          {/* <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <ul>
                <li>Name : ''</li>
                <li>beds : ''</li>
                <li>baths : ''</li>
                <li>Name : ''</li>
            </ul>
          </div> */}

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-4 md:flex md:flex-col">
            <form className="md:flex md:flex-col" onSubmit={onSubmit}>
              {/* <p className="text-sm mt-2 font-sm mb-1">Sell or Rent</p>
               */}
              <label htmlFor="sellorrent">Sell or Rent</label>
              <div className="flex mb-3">
                <button type="button" id="type" value="sale" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    type === 'rent' ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>Sell</button>
                <button type="button" id="type" value="rent" onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    type === 'sale' ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>Rent</button>
              </div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={onChange} placeholder="Enter property name here" maxLength="32" minLength="10" required
               className="w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" />
             <div className="flex space-x-6 mb-3">
                <div className="">
                <label htmlFor="beds">Beds</label><br />
                <input type="number" id="bedrooms" value={bedrooms} onChange={onChange}
                className="w-full px-4 py-2  text-md text-center text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                 min="1" max="50" required />
                </div>
                <div className="">
                <label htmlFor="baths">Baths</label><br />
                <input type="number" id="bathrooms" value={bathrooms} onChange={onChange}
                className="w-full px-4 py-2  text-md text-center text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                 min="1" max="50" required />
                </div>
             </div>
             <label htmlFor="parking">Parking Spot</label>
              <div className="flex mb-3">
                <button type="button" id="parking" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    !parking ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>Yes</button>
                <button type="button" id="parking" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    parking ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>No</button>
              </div>
              <label htmlFor="furnished">Furnished</label>
              <div className="flex mb-3">
                <button type="button" id="furnished" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    !furnished ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>Yes</button>
                <button type="button" id="furnished" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    furnished ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>No</button>
              </div>
              <label htmlFor="address">Address</label>
              <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Enter address here" maxLength="150" minLength="10" required
               className="w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" />
             {!geoLocationEnabled && (
            <div className="flex">
             <div className="mr-3">
                <label htmlFor="latitude">Latitude</label><br />
                    <input type="number" name="latitude" id="latitude" value={latitude} onChange={onChange} 
                    required min="-90" max="90" className="w-full text-center mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" />
                </div>
                <div className="ml-3 ">
                <label htmlFor="longitude">Longitude</label><br />
                    <input type="number" name="longitude" id="longitude" value={longitude} onChange={onChange} 
                    required min="-180" max="180" className="w-full text-center mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" />
             </div>
            </div>
                    
             )}
             <label htmlFor="description">Description</label>
              <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Enter description here" maxLength="150" minLength="10" required
               className="w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" />
             <label htmlFor="offer">Offer</label>
              <div className="flex mb-3">
                <button type="button" id="offer" value={true} onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    !offer ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>Yes</button>
                <button type="button" id="offer" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
                transition duration-150 ease-in-out w-full ${
                    offer ? "bg-white text-black": "bg-slate-600 text-white"
                }`}>No</button>
              </div>
            <div className="mb-3 flex justify-start items-center">
                <div className="">
                <label htmlFor="price">Regular price</label>
                    <div className="flex items-center space-x-6">
                    <input type="number" id="price" value={price} onChange={onChange}
                        className="w-full px-4 py-2 text-md text-center text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        required min="1000"/>
                        {type === "rent" && (
                        <div className="text-md w-full whitespace-nowrap">
                            <p>&#8377;/month</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {offer && (
                <div className="mb-3 flex justify-start items-center">
                <div className="">
                <label htmlFor="discount">Discounted price</label>
                    <div className="flex items-center space-x-6">
                    <input type="number" id="discount" value={discount} onChange={onChange}
                        className="w-full px-4 py-2 text-md text-center text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        required min="1000"/>
                        {type === "rent" && (
                        <div className="text-md w-full whitespace-nowrap">
                            <p>&#8377;/month</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            )}
            <div>
            <label htmlFor="image">Upload Image</label>
            <p className="text-gray-600">The first image will be the cover (max 6)</p>
              <input
                type="file"
                id="image"
                accept=".jpg,.png,.jpeg"
                onChange={onChange}
                multiple
                required
                className="w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 "
              />
            </div>
              <button
                type="submit"
                className="w-full bg-blue-600
                text-white uppercase px-7 py-3 text-sm font-medium
                rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
                hover:shadow-lg active:bg-blue-800">
                Create Listing
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
