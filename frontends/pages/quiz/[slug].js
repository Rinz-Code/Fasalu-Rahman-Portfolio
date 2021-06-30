// import React, { useState } from 'react';
// import 'github-markdown-css'
// import Metadata from '../../comps/Metadata';
// import Image from 'next/image'
import {useState} from 'react';
import {authRequest} from '../../api/auth'
import { UserContext } from '../../contexts/userContext.js'
import {  useContext } from 'react'
// import { useCookies } from 'react-cookie'
// import ReactMarkdown from 'react-markdown';

const BASE_URL = 'http://127.0.0.1:8000';

export const getStaticPaths = async () =>{
    const res = await fetch(`${BASE_URL}/posts/`);
    const data = await res.json();
    // console.log(data)
    const paths = data.map(post => {
        return{
            params: {slug:post.slug.toString()}
        }
    })

    return {
        paths,
        fallback:true,
    }
}
export const getStaticProps = async ({params}) => {
    const slug = params.slug;
    console.log(slug)
    const res = await fetch(`${BASE_URL}/quiz/q/${slug}/`);
    const data = await res.json();
    console.log(data)
    return {
        props: { quiz: data },
        revalidate:1
    }
}

const myLoader = ({src}) => {
  return src
}


export default function App({quiz}) {
  console.log(quiz)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const {user} = useContext(UserContext)
  const [score, setScore] = useState(0);
  if (process.browser){
    if (window && JSON.parse(window.localStorage.getItem('score')) && !showScore){
      const scoreLs = JSON.parse(window.localStorage.getItem('score'));
      setScore(scoreLs?.score);
      setShowScore(true);
    }
  }
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      let form_data = new FormData();
      form_data.append('score',score);
      form_data.append('quiz',quiz?.[0].quiz)
      // console.log(quiz?.)
      authRequest.post(`/quiz/score/`,form_data)
      .then(res=>{
        console.log(res.data)
        window.localStorage.setItem('score',JSON.stringify({'score':score,'quiz':quiz?.[0]?.quiz,'user':user ?? 'no user'}))
        // setCookies('score',{'quiz':quiz?.[0].quiz,'score':score})
        // console.log(cookies)
        console.log(JSON.parse(window.localStorage.getItem('score')))
      }).catch(err=>console.log(err))
    }
  };
  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quiz?.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quiz?.length}
            </div>
            <div className='question-text'>{quiz?.[currentQuestion].title}</div>
          </div>
          <div className='answer-section'>
            {quiz?.[currentQuestion].answer.map((answerOption) => (
              <button key={answerOption.id} onClick={() => handleAnswerOptionClick(answerOption.is_right)}>{answerOption.answer_text}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

