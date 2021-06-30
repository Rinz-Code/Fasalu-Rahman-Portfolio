import {BASE_URL} from '../api/auth';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";
import {UserContext} from "../contexts/userContext";
import {useContext} from "react";
import ErrorPage from "next/error";
import menuIcon from '@iconify/icons-majesticons/menu';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon, InlineIcon } from '@iconify/react';




const myLoader = ({src}) => {
  return src
}

const Navbar = () => {
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
    const  [className,setClassName] = useState(``)
    const respochanger = () => {
        if (className === ""){
            setClassName('opened')
        }
        if (className === "opened"){
            setClassName("")
        }
    }
        return (
            <div className="navbar">
                <div className="container">
                    <a href="#" className="logo">Fasal Cheekode</a>
                        
                    <div className="mobile-menu-wrapper">
                            <Icon icon={menuIcon} style={{color: '#aeaeae'}} className="mobile-menu" id="mobile-cta" onClick={respochanger} /> 
                    </div>

                    <nav className={className}>
                        <Icon icon={closeFill} className="mobile-menu-exit" id="mobile-exit" onClick={respochanger}/>
                        <ul className="primary-nav">
                            <li> <a href="#">Home</a> </li>
                            <li> <a href="#">Quiz</a> </li>
                            <li> <a href="#">Gallery</a> </li>
                            <li> <a href="#">Blog</a> </li>
                        </ul>
                        <ul className="secondary-nav">
                            {isUserLoggedIn ?
                                (user.is_staff ?  (<li> <a className="nav-main-btn" href="#">Admin</a> </li>):( <li> <a href="#" className="nav-main-btn">Log Out</a> </li> ) )
                                :( <li> <a href="#" className="nav-main-btn">Sign Up</a> </li> )
                            }
                        </ul>
                    </nav>
                </div>
            </div>
     );
}
 
export default Navbar;