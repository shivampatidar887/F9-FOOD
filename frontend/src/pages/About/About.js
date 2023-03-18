import React, { Fragment, useEffect } from 'react';
import Loader from '../../component/layout/Loader/Loader';
import './About.css';
import { MdSlowMotionVideo, MdDeliveryDining, MdFoodBank } from 'react-icons/md';
import { BsFillBagCheckFill } from 'react-icons/bs';
const About = () => {


  return (
    <Fragment>
       
      <div class="banner-container">
        
        <img class="banner-img" src={require('./assets/banner.jpg')} alt="logo.image" />
        
        <div class="banner-title">
          <h1>HARD WORK FOR THE DIGITAL AGE</h1>
        </div>
        <div class="banner-txt">
          <p>Welcome to F9-FOOD, a vibrant and exciting restaurant that's all about serving up delicious food for young people! We believe that great food doesn't have to be boring or expensive, and we're on a mission to prove it.

            Our story began with a simple idea: to create a place where young people could come and enjoy amazing food that's fresh, healthy and bursting with flavour. We noticed that there were very few restaurants out there that catered specifically to young people, and we saw an opportunity to fill that gap.

            So we set out to create a restaurant that's fun, vibrant and full of life, with a menu that's packed full of exciting dishes that young people will love. From mouth-watering burgers and crispy chicken wings to fresh salads and vegetarian options, we've got something for everyone.

            We're also passionate about using only the freshest, locally sourced ingredients in our dishes, so you can be sure that everything on your plate is of the highest quality. And with our friendly, welcoming atmosphere and affordable prices, we're the perfect place to hang out with friends and enjoy great food.

            So come and join us at F9-FOOD, where the food is always fresh, the vibe is always lively and the good times are always rolling!</p>
        </div>
      </div>
      <main>
        <div class="img-txt-container">
          <div class="img-container">
            <img width="293" src={require('./assets/sarah.jpg')} alt="logo.image" />
          </div>
          <div class="txt-container">
            <h2>SARAH</h2>
            <h4>Owner</h4>
            <p>Our journey began over 10 years ago when I first started working in the food industry. I quickly fell in love with the art of cooking and the joy of creating memorable dining experiences for our customers. That passion eventually led me to open this restaurant, and I couldn't be more proud of what we've accomplished together.

              Over the years, we've been fortunate enough to serve thousands of customers, and we've learned a lot about what it takes to create a successful restaurant. For us, it's not just about the food - although that's certainly a critical component. It's also about creating an atmosphere that's warm and welcoming, where people can come together to share a meal and create memories with their loved ones.
              But we're not content to rest on our laurels. As we look to the future, our goal is to continue to innovate and evolve, to find new ways to surprise and delight our customers. Whether that means experimenting with new dishes or incorporating new technologies to enhance the dining experience, we're committed to staying at the forefront of our industry.

              Of course, I couldn't do this alone. I'm lucky to be surrounded by an incredibly talented team of chefs, servers, and staff who share my passion for great food and exceptional service. Without them, none of this would be possible.
              So as we move forward, I want to thank our customers for their continued loyalty and support, and I want to assure you that we're always striving to be better, to exceed your expectations, and to make your dining experience truly special. Thank you."
            </p>
          </div>
        </div>
        <div class="img-txt-container">
          <div class="img-container">
            <img width="293" src={require('./assets/john.jpg')} alt="logo.image" />
          </div>
          <div class="txt-container">
            <h2>JOHN</h2>
            <h4>« business partner »</h4>
            <p>We're thrilled to be partnering with F9-FOOD to bring high-quality food to even more people. Our shared values of sustainability and community engagement make this a natural fit, and we look forward to a long and successful partnership."

              "As a small, family-owned business ourselves, we're proud to be working with F9-FOOD to promote local, independent restaurants. By collaborating with them, we can offer our customers even more delicious and diverse dining options.
              We are excited to be a part of this venture and look forward to contributing our expertise in marketing and business development to help the restaurant grow and expand its reach.
            </p>
          </div>
        </div>
        <div class="img-txt-container">
          <div class="img-container">
            <img width="293" src={require('./assets/luis.jpg')} alt="logo.image" />
          </div>
          <div class="txt-container">
            <h2>LUIS</h2>
            <h4>« business partner »</h4>
            <p>At F9-FOOD, we believe in the power of collaboration to achieve our goals. That's why we're excited to be partnering with LUIS's CAFE AND BAR to bring their unique culinary expertise to our platform. Together, we can provide an unparalleled experience for food lovers everywhere."
              Our partnership with this restaurant is a testament to our commitment to supporting local businesses and promoting sustainable practices. We believe that by working together, we can create a better future for our community and the environment
            </p>
          </div>
        </div>
        <div class="img-txt-container">
          <div class="img-container">
            <img width="293" src={require('./assets/achievements.png')} alt="logo.image" />
          </div>
          <div class="txt-container">
            <h4>« The Diamond Achievement Awards »</h4>
            <p>Dear valued customers,

              I am thrilled to share with you that our restaurant has recently been awarded the prestigious title of "Best Food" by the International Food Critics Association. As the owner of this establishment, I am extremely proud of this achievement and I want to extend my heartfelt gratitude to each and every member of our team who has made this possible.

              When I started this restaurant, my goal was to create a dining experience that was not only delicious but also memorable. I wanted to offer a space where people could come together and enjoy the simple pleasures of life – good food, good company, and good conversation.

              Receiving this award has validated our hard work and dedication towards providing you with the best dining experience possible. It is a testament to the passion and commitment of our team, who strive to deliver excellence in every dish that leaves our kitchen.

              I would also like to thank our loyal customers who have supported us from the beginning. Your feedback and encouragement have helped us to continuously improve and evolve our offerings.

              We promise to continue delivering the same level of quality and innovation that has earned us this recognition, and we hope to have the pleasure of welcoming you back soon to experience it for yourself.
            </p>
          </div>
        </div>
      </main>
    </Fragment>


  );
};

export default About;
