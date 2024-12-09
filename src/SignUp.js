import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { db } from "./firebase_init";
import { collection, doc, setDoc,getDocs } from "firebase/firestore";
import logo from "./assets/letter-v.png"
import { StateCardData } from "./Data/StatesCardData";

export const SignUp = () => {
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [state, setState] = useState('');  // State selection
    const [sector, setSector] = useState(''); // Sector selection
    const navigate = useNavigate();
  
    const changeFirstName = (event) => {
      setFirstName(event.target.value);
    };
    const changeLastName = (event) => {
      setLastName(event.target.value);
    };
    const changeEmail = (event) => {
      setEmail(event.target.value);
    };
    const changePassword = (event) => {
      setPassword(event.target.value);
    };
    const changeCpassword = (event) => {
      setCpassword(event.target.value);
    };
    const changeState = (event) => {
      setState(event.target.value);  // Capture selected state
    };
    const changeSector = (event) => {
      setSector(event.target.value); // Capture selected sector
    };
  
    const setData = async () => {
        if (fname === '' || email === '' || password === '' || cpassword === '' || state === '' || sector === '') {
          alert('Kindly fill all the fields');
          return;
        }
      
        if (password !== cpassword) {
          alert('Passwords do not match!');
          return;
        }
      
        let flag = true;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.data().Email === email) {
            flag = false;
          }
        });
      
        if (!flag) {
          alert('Entered Email is already registered!');
          return;
        }
      
        try {
          const docRef = doc(collection(db, 'users')); // Create a new document in the "users" collection
          await setDoc(docRef, {
            FirstName: fname,
            LastName: lname,
            Email: email,
            Password: password, // Store passwords safely in production! (consider hashing)
            State: state,
            Sector: sector,
          });
      
          // Clear the form after successful registration
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setCpassword('');
          setState('');
          setSector('');
      
          alert('Account created successfully!');
          navigate('/Login');
        } catch (error) {
          console.error("Error writing document: ", error);
          alert('Error registering the user, please try again.');
        }
      };
  
    return (
      <>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} class="h-8 animate-pulse" alt="VentureVue" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">VentureVue</span>
            </a>
          </div>
        </nav>
        <section class="bg-gray-50 dark:bg-gray-900">
          <div style={{ height: '100%' }} class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
            <div style={{ marginBottom: '10px' }} class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                  <div style={{ display: 'inline-block' }}>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input value={fname} onChange={changeFirstName} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XYZ" required />
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input value={lname} onChange={changeLastName} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XYZ" required />
                  </div>
                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={email} onChange={changeEmail} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={password} onChange={changePassword} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input value={cpassword} onChange={changeCpassword} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
  
                  {/* State Dropdown */}
                  <div>
                    <label for="states" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                    <select value={state} onChange={changeState} id="states" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a State</option>
                      {StateCardData.map((value, index) => (
                        <option key={index} value={value.stateName}>{value.stateName}</option>
                      ))}
                    </select>
                  </div>
  
                  {/* Sector Dropdown */}
                  <div>
                    <label for="sector" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector</label>
                    <select value={sector} onChange={changeSector} id="sector" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a Sector</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Energy">Energy</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Finance">Finance</option>
                      <option value="Dining">Dining</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Legal Services">Legal Services</option>
                      <option value="Retail">Retail</option>
                      <option value="Technology">Technology</option>
                      <option value="Tourism">Tourism</option>
                    </select>
                  </div>
  
                  <button style={{ border: '2px solid white' }} onClick={setData} type="button" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
  
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? &nbsp;&nbsp;
                    <Link to='/Login' class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  