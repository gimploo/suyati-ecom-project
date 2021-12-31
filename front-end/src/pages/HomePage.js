import React from "react";
import { Carousel } from 'react-carousel-minimal';

const HomePage = () => {

 const data = [
    {
      image: "https://manybooks.net/sites/default/files/2018-07/bookdisplaysmall.jpg",
      caption: "Placeholder 01"
    },
    {
      image: "https://manybooks.net/sites/default/files/2018-07/bookcoverssmall2.jpg",
      caption: "Placeholder 02"
    },
    {
      image: "https://manybooks.net/sites/default/files/2018-07/bookstackssmall.jpg",
      caption: "Placeholder 03"
    },
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  return (
    <div class='bg-blue-200'>
    <div class='bg-black border-2 h-auto text-center w-full'>
      <Carousel
        data={data}
        time={10000}
        width="100%"
        captionStyle={captionStyle}
        radius="10px"
        captionPosition="center"
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
      />
    </div>

    <h1 class='p-8 text-4 text-center font-bold text-blue-800'> Home page </h1>

    </div>
  );
}


export default HomePage;
