import { authRequest } from "../api/auth";
import  Image  from "next/image";


const BASE_URL = 'http://127.0.0.1:8000';

export const getStaticProps = async () => {
    const res = await fetch(`${BASE_URL}/gallery/`);
    const data = await res.json();
    return {
        props: { gallery:  data},
        revalidate:10
    }
}

const myLoader = ({src}) => {
  return src
}

const DateRenderer = ({date}) =>{
    let d = new Date(date);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()]
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[d.getDay()]
    console.log(`${day}, ${d.getDate()} ${month} ${d.getFullYear()}`)

    return (
        <>{day}, {d.getDate()} {month} {d.getFullYear()}</>
    );
}

const Gallery = ({gallery}) => {
    let date = new Date(gallery[0].uploaded_at)

    console.log(date)
    return ( 
        <>
            <div>
                {gallery.map(photo=>(
                    <div key={photo.id} className='gallery'>
                        <h1>{photo.camp_name} conducted by {photo.conducted_by}</h1>
                        <div>
                            {photo.image_1 && 
                                <div>
                                    <Image
                                        loader={myLoader}
                                        src={`${photo?.image_1}`}
                                        alt={`${photo.camp_name} conducted by ${photo.conducted_by}`}
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                            }
                            {photo.image_2 && 
                                <div>
                                    <Image
                                        loader={myLoader}
                                        src={`${photo?.image_2}`}
                                        alt={`${photo.camp_name} conducted by ${photo.conducted_by}`}
                                        layout='fill'
                                        objectFit='contain'
                                        // quality={100}
                                    /> 
                                </div>
                            }
                            {photo.image_3 &&  
                                <div>
                                    <Image
                                        loader={myLoader}
                                        src={`${photo?.image_3}`}
                                        alt={`${photo.camp_name} conducted by ${photo.conducted_by}`}
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                            }
                            {photo.image_4 &&  
                                <div>
                                    <Image
                                        loader={myLoader}
                                        src={`${photo?.image_4}`}
                                        alt={`${photo.camp_name} conducted by ${photo.conducted_by}`}
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                            }
                            </div>
                            <DateRenderer date={photo.uploaded_at}/>
                    </div>
                ))
                }
            </div>
        </>
     );
}
 
export default Gallery;