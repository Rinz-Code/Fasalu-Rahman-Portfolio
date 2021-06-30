import Metadata from '../../comps/Metadata';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { UserContext } from '../../contexts/userContext.js'
import {  useContext } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

export const getStaticProps = async () => {
    const res = await fetch(`${BASE_URL}/posts/`);
    const data = await res.json();
    return {
        props: { posts:  data},
        revalidate:10
    }
}

function Home({posts}) {
    console.log(posts)
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
  return (
    <>
        <Metadata title={`Fasal Cheekode Creative Corner | Blog`}  description={'Fasal Cheekode Creative Corner is The Corner of Education'}/>
        <div>
            <h1 className={styles.title}>Home Page</h1>
            {isUserLoggedIn ?
             <div className="posts-user-div">
              <h1>Hai {user?.username}</h1>
             </div>
             :(
                <Link href="/login">
                    <a>Login</a>
                </Link>)}
            <div className="posts-user-div">
                {posts.map(post=>(
                    <Link href={`/posts/${post.slug}`} key={post.id}>
                        <a className={styles.single}>
                            <h3>{post.title}</h3>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </>
  );
}
export default Home
