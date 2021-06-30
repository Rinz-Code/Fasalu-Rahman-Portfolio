import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext.js';
import {  useContext } from 'react';
import ErrorPage from 'next/error';
import Link from 'next/link';

const Index = () => {
    const {BASE_URL,user, setUser, isUserLoggedIn,authRequest} = useContext(UserContext)
    const [editSlug,setEditSlug] = useState('');
    const [deleteSlug,setDeleteSlug] = useState('');
    return ( 
        <>
            {isUserLoggedIn ?
            ( user.is_staff
                 && <>
                    <h1>Hai Fasal Sir</h1>
                    <h2>For Administration of this web site check links below:</h2>
                    <div>
                        <h3>Blog</h3>
                        <h4>To create <Link href='fasalcheekode/blog/create'><a>Blog</a></Link></h4>
                        <h4>To Edit a blog:</h4>
                        <div>
                            Type Slug of the blog here: <input value={editSlug} onChange={e=>setEditSlug(e.target.value) }></input>
                            Link is <Link href={`fasalcheekode/blog/edit/${editSlug}`}><a>localhost:8000/admin/fasalcheekode/blog/edit/{editSlug}</a></Link>
                        </div>                    
                        <h4>To Delete a blog:</h4>
                        <div>
                            Type Slug of the blog here: <input value={deleteSlug} onChange={e=>setDeleteSlug(e.target.value) }></input>
                            Link is <Link href={`fasalcheekode/blog/delete/${deleteSlug}`}><a>localhost:8000/admin/fasalcheekode/blog/delete/{deleteSlug}</a></Link>
                        </div>
                    </div>
                    <div>
                        <h3>Quiz</h3>
                        <h4>To create, edit and administration of quizzes visit:<Link href={`${BASE_URL}/admin/quiz/`}><a>server page of quiz</a></Link></h4>
                    </div>
                    <h3>For Gallery ,check this <Link href={`${BASE_URL}/admin/api/gallery/`}><a>Link</a></Link></h3>
                    <h2>For more accessablity visit <Link href={`${BASE_URL}/admin/`}><a>server page</a></Link></h2>
                 </>
                 ):
            (
                <ErrorPage statusCode={404}/>
            )}
        </>
     );
}
 
export default Index;