import * as re from "react";
import * as router from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
export default function profile() {
  const auth = getAuth();
  const navigate = router.useNavigate();
  const [changeDetail, setChangeDetail] = re.useState(false);
  const [formData, setFormData] = re.useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  // logout
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  // changing name
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update displayname in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update firestore 
        const docRef = doc(db,"users",auth.currentUser.uid);
        await updateDoc(docRef,{
          name
        })
      }
      toast.success("Profile details updated.")
    } catch (error) {
      toast.error("Could not update the profile details.");
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name input  */}
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl  text-gray-700 bg-white border-gray-300 
        rounded transition ease-in-out ${
          changeDetail && "bg-red-200 focus:bg-red-200"
        }`}
            />
            {/* email input  */}
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl  text-gray-700 bg-white border-gray-300 
        rounded transition ease-in-out"
            />
            {/* change input  */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 ">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out 
           duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out 
          duration-200 cursor-pointer "
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
