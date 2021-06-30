import Image from 'next/image'

import { Icon, InlineIcon } from '@iconify/react';
import youtubeIcon from '@iconify/icons-bi/youtube';
import facebookIcon from '@iconify/icons-bi/facebook';
import telegramIcon from '@iconify/icons-bi/telegram';
import whatsappIcon from '@iconify/icons-dashicons/whatsapp';

import {UserContext} from "../contexts/userContext";
import Navbar from "../comps/Navbar";
import {useContext} from "react";

const Home = ()=>{
    const {user, setUser, isUserLoggedIn} = useContext(UserContext);

    return (
        <div className="home">
             <Navbar></Navbar>
            <section className="hero">
                <div className="container">
                    <div className="fasal-sir"></div>
                    <div className="right-col">
                        <p className="subhead">educator/vlogger/motivater</p>
                        <h1>I am Fasalu Rahman Cheekode</h1>
                        <div className="social-btns">
                            <div className="social-btn"> <a href="https://www.youtube.com/channel/UCz6KjxlPss6zK4dl8Yay0Fw"> <Icon className="icon" icon={youtubeIcon} /> </a> </div>
                            <div className="social-btn"> <a href="https://www.facebook.com/fasalcheekodeCreativecorner/"><Icon className="icon" icon={facebookIcon}/></a> </div>
                            <div className="social-btn"> <a href=""><Icon className="icon" icon={telegramIcon}/></a> </div>
                            <div className="social-btn"> <a href="https://www.wa.me/+919745322902"><Icon className="icon" icon={whatsappIcon}/></a> </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about">
                <div className="container">
                    <div className="l-col">
                        <p className="styled-head about-styled">About</p>
                        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem porttitor lorem condimentum. Pulvinar non pharetra nibh bibendum in ac, convallis nisi senectus. Id sed dui quis etiam pretium fermentum condimentum dui. Posuere in facilisis nisi est nec feugiat in. Leo vitae fermentum felis dui ornare.</p>
                    </div>
                    <div className="about-img"></div>
                </div>
            </section>
            <section className="contact">
                <div className="container">
                    <div className="cont-l">
                        <p className="styled-head contact-styled">Contact</p>
                        <form action="">
                            <input type="text" id="name" name="name" placeholder="Name"/>

                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
 
                            <input type="submit" className="send-message-cta" value="Send"/>

                        </form>

                    </div>
                    
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31319.337284472433!2d76.32711303703219!3d11.1195    47443700812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba62ea1bd39f74d%3A0xaa1276b61c637ab9!2sKaruvarakundu%2C%20Kerala%2    0676523!5e0!3m2!1sen!2sin!4v1624168810911!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="laz    y"></iframe>

                </div>
            </section>
        </div>
    )
}
export default Home;