import React, { Component } from "react";
import { Link, Router, withRouter } from "react-router-dom";
class Landing extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.gamerClub)
      }



  render() {
    var styles = {
        container: {
            margin: 7,
            display: "inline-block",
            textAlign: "center",
     
        },
        text: {
            left: "50%",
            fontFamily: "Courier New"

 
        },
        codeText: {
            left: "50%",
            fontFamily: "monospace"

 
        }

    }

    return (
        <div style={{ height: "75vh"}} className="container halign-wrapper" >
        
              <div style={{marginTop: 120}}className="col s12 center-align">
                    <h5>
                        <b style = {styles.text}>join this club with the code below</b>
                    </h5>
                </div>
                <div style={{marginTop: 20}}className="col s12 center-align">
                       
                       <h2>
                            <b style={styles.codeText}> {this.props.gamerClub.id} </b>

                       </h2>

               
               </div>


                <div style={{marginTop: 20}}className="col s12 center-align">
                    <Link to="/home" class="waves-effect waves-light btn-large"  style={{
        
                        background: "grey",
                        fontFamily: "monospace" ,
                        marginRight: 10       
                    }}>Back to Home</Link> 

                    <button class="waves-effect waves-light btn-large"  style={{
                            
                            background: "#000",
                            fontFamily: "monospace" ,     
                            marginLeft: 10  
                        }}>view club</button> 

                
                </div>
          

                





        </div>
            
    
    );
  }
}


export default withRouter(Landing);