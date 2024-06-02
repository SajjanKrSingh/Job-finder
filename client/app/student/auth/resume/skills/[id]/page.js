"use client"
import { asynceditjobstudent, asynceditskillstudent } from '@/store/Actions/studentActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const page = ({params}) => {

  const dispatch = useDispatch();
  const [skill, setskill] = useState();
  const [level, setlevel] = useState();
  const router = useRouter();
  const EditSkillHandler = (e) => {
    e.preventDefault()

    const sk = {
      skill,
      level
    }

    dispatch(asynceditskillstudent(params.id,sk));
    router.push("/student/auth/resume");
  };

  return (
    <div>
       <div>

<h1 className="text-2xl font-normal ml-10 mt-5">Add <span className="text-blue-600 ">Skill</span></h1>

<div className="p-10">
<form  onSubmit={EditSkillHandler}>
 <div class="relative z-0 w-full mb-6 group">
   <input
    onChange={(e)=>setskill(e.target.value)}
     type="text"
     name="floating_email"
     id="floating_email"
     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-950 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
     placeholder=" "
   
   />
   <label
     for="floating_email"
     class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
   Skill
   </label>
 </div>

 <div class="relative z-0 w-full mb-6 group">
  <select onChange={(e)=>setlevel(e.target.value)} name="" id="">
  <option value="beginner ">beginner</option>
   <option value="internmediate">internmediate</option>
   <option value="advance">Advance</option>
  </select>
   <label
     for="floating_password"
     class=""
   >
 : Level
   </label>
 </div>


 <button
   type="submit"
   class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 >
  Add skill
 </button>
</form>
</div>

</div>
    </div>
  )
}

export default page