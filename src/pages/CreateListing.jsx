import React, { useState } from "react";

export default function CreateListing() {
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
    discount :0
    });
  const {type,name,bedrooms,bathrooms,parking,furnished,
    address,description,offer,price,discount} = formData;
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  function onChange(){
    
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
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
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
            <form className="md:flex md:flex-col">
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
                <input type="number" id="beds" value={bedrooms} onChange={onChange}
                className="w-full px-4 py-2  text-md text-center text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                 min="1" max="50" required />
                </div>
                <div className="">
                <label htmlFor="baths">Baths</label><br />
                <input type="number" id="baths" value={bathrooms} onChange={onChange}
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
                <button type="button" id="type" value={false} onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg 
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
                onChange={handleImageUpload}
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
