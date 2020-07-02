import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const one = "https://upload.wikimedia.org/wikipedia/en/6/6d/BioShock_cover.jpg";
const two = "https://images.g2a.com/newlayout/323x433/1x1x0/06114476276e/59108976ae653aa55c6ac1f2";
const three = "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dishonored_box_art_Bethesda.jpg/220px-Dishonored_box_art_Bethesda.jpg";
const four = "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Metro_2033_Game_Cover.jpg/220px-Metro_2033_Game_Cover.jpg";
const five = "https://upload.wikimedia.org/wikipedia/en/f/f1/TombRaider2013.jpg";
const six = "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/220px-Doom_Cover.jpg";


class Carousel extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };
    M.Carousel.init(this.Carousel, options);

    //Instance Plugin
    // let instance = M.Carousel.getInstance(this.Carousel);
    // instance.next(2);
  }

  render() {
    var styles = {
        image: {
            height: 255,
            width: "auto"
        }
    }

    return (
      <div
        ref={Carousel => {
          this.Carousel = Carousel;
        }}
        className="carousel"
        style = {{
            marginTop : -80
        }}
      >
        <a className="carousel-item">
          <img alt="1" src={one} style = {styles.image} />
        </a>
        <a className="carousel-item">
          <img alt="2" src={two} style = {styles.image}/>
        </a>
        <a className="carousel-item">
          <img alt="3" src={three} style = {styles.image}/>
        </a>
        <a className="carousel-item">
          <img alt="4" src={four} style = {styles.image}/>
        </a>
        <a className="carousel-item">
          <img alt="5" src={five} style = {styles.image}/>
        </a>
        <a className="carousel-item">
          <img alt="6" src={six} style = {styles.image}/>
        </a>
      </div>
    );
  }
}

export default Carousel;