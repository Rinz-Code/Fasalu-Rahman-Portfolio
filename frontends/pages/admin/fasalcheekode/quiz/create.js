import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../../contexts/userContext.js'
import {  useContext } from 'react';
import ErrorPage from 'next/error';


export default function Create() {
    const {BASE_URL,user, setUser, isUserLoggedIn,authRequest} = useContext(UserContext)
    const [noofquestions,setNoofquestions] = useState(2);
    const [quiz,setQuiz] = useState('');
    const [questions,setQuestions] = useState([])//[{question:'',answers:[{answer_text:'',is_right:true},{answer_text:'',is_false:false},{answer_text:'',is_false:false}]}])
    // console.log([...new Array(noofquestions).keys()])
    // const [nulist,setNulist] = useState([...new Array(noofquestions).keys()])
    return (
        <>

            <ErrorPage statusCode={404}/>
        </>
    );
}

// // for (const x of Array(5).keys()) {
// //   console.log(x, String.fromCharCode('A'.charCodeAt(0) + x));
// // }

//         /* <form onSubmit={e=>{
//             e.preventDefault();
//             const value = [...new Array(noofquestions).keys()]
//             let answers = [];
//             // setQuestions([]);
//             let quest = []
//             for (let qno of value){
//                 answers = [];
//                 [...new Array(4).keys()].map(opno =>{
//                         // setQuestions(...questions,{question:e.target[`qu`]})
//                     answers.push({answer_text:e.target[`option${opno}${qno}`].value,is_right:e.target[`istrue${opno}${qno}`].checked})
//                 });
//                 quest.push({title:e.target[`question${qno}`].value,answers:answers})
//                 // setQuestions([...questions,{title:e.target[`question${qno}`].value,answers:answers}])
//                 console.log(quest);
//             };
//             setQuestions(quest);
//             console.log(questions);
//             let formData = new FormData();
//             formData.append('title',quiz);
//             formData.append('question',quest);
//             authRequest.post('/quiz/do/',{title:quiz})
//                   .then(res => {
//                     console.log(res.data);
//                     authRequest.post('/quiz/newQuestion')
//                   })
//                   .catch(err => console.log(err))
//             // value.map(qno =>{
//             //     console.log()
//             // });
//             // console.log(e.target[`istrue11`].checked)
//             // const formData = new FormData(e.target.value);
//             // e.preventDefault();
//             // console.log(formData)
//             // for (let [key, value] of formData.entries()) {
//             //     console.log(key, value);
//             // }
//             }}>
//             <input type='text' id='quizname' placeholder='Quiz Name' value={quiz} onChange={(e)=>{setQuiz(e.target.value)}}></input>
//             {[...new Array(noofquestions).keys()].map(numb => (
//                 <div key={numb} className='colorred' >
//                     <p>{`Question ${numb+1}`}</p>
//                     <input placeholder={`Question`} name={`question${numb}`} type='text' ></input>
//                     <div className='stylod'>

//                     {[...new Array(4).keys()].map(number=>(    
//                         <div key={number}> 

//                             <input placeholder={`Option`} type='text' name={`option${number}${numb}`}></input>
//                             <input type="checkbox" name={`istrue${number}${numb}`}/>
//                             <label htmlFor="notifyuser">Is True</label><br/>
                            
//                         </div>
//                     ))}   
                       
//                     </div> 
//                     {/* <button onClick={e=>setNulist(nulist.splice(numb,1))}>Delete this Question</button> */}
// /                    </div>
//                     ))}
//                     <button onClick={(e)=>{e.preventDefault();setNoofquestions(noofquestions + 1)}}>Add one more Question</button>
//                     <button onClick={(e)=>{e.preventDefault();setNoofquestions(noofquestions - 1)}}>Remove one Question</button>
//                     <button type="submit">Submit</button>
//                 </form>
//              */