import 'github-markdown-css'
import Metadata from '../../comps/Metadata';
import Image from 'next/image'
import {useState} from 'react';
import ReactMarkdown from 'react-markdown';

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
        revalidate:1
    }
}

const myLoader = ({src}) => {
  return src
}

const Details = ({ post })=>{
    if(!post) return <div>is Loading</div>
    // const [im]
    // if (post.image) 
    return (
     <>
        <Metadata title={`${post?.title} | Fasal Cheekode Creative Corner`}  description={` ${post?.body.substr(0,136)}....`}/>
        <div>
            <h1>{ post?.title }</h1>
                {post.image &&  <Image
                    loader={myLoader}
                    src={`${post?.image}`}
                    alt={post?.title}
                    width={800}
                    height={500}
                  /> }
            {post?.body && 
           <div className='markdown-body'> 
            <ReactMarkdown source={post.body}/>
           </div> 
            }
            <p>Written by { post?.owner }</p>
        </div>
     </>
    );
}

export default Details;