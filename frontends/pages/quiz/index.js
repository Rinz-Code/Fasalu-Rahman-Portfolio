import Metadata from '../../comps/Metadata';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { UserContext } from '../../contexts/userContext.js'
import {  useContext } from 'react';

const BASE_URL = 'http://127.0.0.1:8000';

export const getStaticProps = async () => {
    const res = await fetch(`${BASE_URL}/quiz/`);
    const data = await res.json();
    return {
        props: { quizzes:  data},
        revalidate:10
    }
}

function Home({quizzes}) {
    console.log(quizzes)
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
  return (
    <>
        <Metadata title={`Fasal Cheekode Creative Corner | Quiz`}  description={'Fasal Cheekode Creative Corner is The Corner of Education'}/>
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
                {quizzes.map(quiz=>(
                    <Link href={`/quiz/${quiz.title}`} key={
                        quiz.id}>
                        <a className={styles.single}>
                            <h3>{quiz.title}</h3>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </>
  );
}
export default Home
