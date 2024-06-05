import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { TbCricket } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineHistory } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { updateFormData } from '../redux/slices/formSlice';

const NewMatch = () => {

    //dispatching formData to slice:
    const dispatch = useDispatch();

    const [activeItem, setActiveItem] = useState('New Match');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
    const navigate=useNavigate();
    function changeHandler(event){
        setFormData(prevData=>{
          const {name,value,type,checked}=event.target;
          return{
            
           ...prevData,
              [name]: type==="checkbox"?checked: value
          }
        })
      }
    const [formData,setFormData]=useState({
        Host:"",Visitor:"",Toss:"",BatOrBowl:"",overs:""
    })  
    console.log(formData)
    console.log("form newMatch and printing host name:")
    // console.log(formData.Host.value)
    function submitHandler(event) {
      event.preventDefault(); // Prevent default form submission behavior
      dispatch(updateFormData(formData)); // Dispatch action to update formData in Redux store
      console.log("I am from newMatch")
      console.log(formData);
      navigate('/scoreBoard'); // Navigate to '/scoreBoard' route
    }
    
    // Navigate to scoreBoard if form is filled
  const navigateToScoreBoard = () => {
    dispatch(updateFormData(formData)); // Dispatch action to update formData in Redux store

    if (isFormFilled()) {
      navigate('/scoreBoard');
    } else {
      alert('Please fill all required fields');
    }
  };
    const isFormFilled = () => {
      return Object.values(formData).every((value) => value.trim() !== '');
    };
  return (
    
    <div className='w-full min-h-full relative '>
        <Navbar></Navbar>

        <form onSubmit={submitHandler}>
        <section className=' bg-slate-100 w-full max-h-full' id='Teams'>
            <h3 className='text-color mx-2'>Teams</h3>
            <div className='border rounded-lg px-2 py-4 mt-2 mx-2 flex flex-col bg-white gap-2'>
                <input 
                required
                className='border-b-2 border-gray-300 focus:border-green-500 focus:outline-none'
                 type="text" 
                 placeholder='Host Team'
                 name='Host' 
                 onChange={changeHandler}
                value={formData.Host}
        />
                <input 
                required

                className='border-b-2 border-gray-300 focus:border-green-500 focus:outline-none' 
                type="text" 
                placeholder='Visitor Team'
                name='Visitor' 
                onChange={changeHandler}
                value={formData.Visitor}
        />

            </div>
            {/* Toss won by */}
            <h3 className='text-color mx-2 mt-2'>Toss Won By?</h3>

            <div className='border rounded-lg px-2 py-4 mt-2 mx-2 flex  bg-white gap-2' id='TossWonBY'>
                <label htmlFor="Host">Host Team</label>
                <input type="radio" 
                required

                name="Toss" id="Host" 
                value="Host"
                checked={formData.Toss==="Host"}
                onChange={changeHandler}
                />
                <label htmlFor="Visitor">Visitor Team</label>
                <input type="radio" 
                name="Toss" id="Visitor"
                value="Visitor"
                checked={formData.Toss==="Visitor"}
                onChange={changeHandler}
                />


            </div>
{/* opted to? */}
            <h3 className='text-color mx-2 mt-2'>Opted to?</h3>

            <div className='border rounded-lg px-2 py-4 mt-2 mx-2 flex  bg-white gap-2' id='TossWonBY'>
                <label htmlFor="Bat">Bat</label>
                <input type="radio" 
                required

          name="BatOrBowl"
          value="Bat"
          checked={formData.BatOrBowl==="Bat"}
          id="Bat" 
          onChange={changeHandler}/>
                <label htmlFor="Visitor">Bowl</label>
                <input type="radio" 
                required

          name="BatOrBowl"
          value="Bowl"
          checked={formData.BatOrBowl==="Bowl"}
          id="Bowl" 
          onChange={changeHandler}/>


            </div>
            {/* Overs */}
            <h3 className='text-color mx-2 mt-2'>Overs?</h3>
            <div className='border rounded-lg px-2 py-4 mt-2 mx-2 flex flex-col bg-white gap-2'>
            <input 
  required
  className='border-b-2 border-gray-300 focus:border-green-500 focus:outline-none'
  type="text"
  placeholder='0'
  name="overs"
  value={formData.overs}
  onChange={changeHandler}
  pattern="[1-9][0-9]?"  // Only allow numbers between 1 to 90
  min="1"                 // Set the minimum value to 1
  max="90"     
  title="Please enter a number between 1 and 90"           // Set the maximum value to 90
/>
                
                

            </div >
            <button onSubmit={submitHandler}
            onClick={navigateToScoreBoard}
            disabled={!isFormFilled()}
            type='button' className='mx-2 mt-6 mb-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded' id='startBtn'>Start A New Match</button>



        </section>
        </form>
        <footer className='flex justify-between items-center px-4 sm:px-24 py-2'>
      <div 
        className={`cursor-pointer ${activeItem === 'New Match' ? 'text-orange-500' : 'text-gray-500'} flex flex-col justify-center items-center`} 
        onClick={() => handleItemClick('New Match')}
      >
        <TbCricket />
        <p>New Match</p>
      </div>
      <div 
        className={`cursor-pointer ${activeItem === 'Teams' ? 'text-orange-500' : 'text-gray-500'} flex flex-col justify-center items-center`} 
        onClick={() => handleItemClick('Teams')}
      >
        <RiTeamLine />
        <p>Teams</p>
      </div>
      <div 
        className={`cursor-pointer ${activeItem === 'History' ? 'text-orange-500' : 'text-gray-500'} flex flex-col justify-center items-center`} 
        onClick={() => handleItemClick('History')}
      >
        <MdOutlineHistory />
        <p>History</p>
      </div>
    </footer>
        
    </div>
  )
}

export default NewMatch