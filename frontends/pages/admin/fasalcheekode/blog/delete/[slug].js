import {useState,useEffect} from 'react';
import { UserContext } from '../../../../../contexts/userContext.js'
import {  useContext } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

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
    const res = await fetch(`${BASE_URL}/posts/${slug}/`);
    const data = await res.json();
    console.log(data)
    return {
        props: { post: data },
       revalidate:10
    }
}

const Details = ({ post })=>{
    if(!post) return <div>is Loading</div>
    const [title,setTitle] = useState(post?.title);
    const {BASE_URL,user, isUserLoggedIn,authRequest} = useContext(UserContext)
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        authRequest.delete(`/posts/${post?.slug}/`)
        .then(res => {
              console.log(res.data);
              let slug = res.data.slug
              console.log(slug)
              router.push(`/`)
            })
            .catch(err => console.log(err))
    };
    return (
        <>
            {isUserLoggedIn ?
            ( user.is_staff
                 && (
                    <div className="form-wrapper">
                        <form noValidate>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Delte Post {title}
                                    </button>
                        </form>
                    </div>
                 )
                 ):
            (
                <ErrorPage statusCode={404}/>
            )}
        </>
    );
}

export default Details