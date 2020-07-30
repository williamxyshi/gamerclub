import React, { Component } from "react";
import M from "materialize-css";

import axios from "axios";

import Collapsible from 'react-collapsible';


const test = []


class PostsComponent extends Component {
    
    constructor(props) {
        super(props);
      }

    
  render() {
    var styles = {
        imageContainer: {
            margin: 7,
            display: "inline-block",
            textAlign: "center",
     
        }
    }

    var postsComments = []
    if(this.props.gamerClub.postscomments) {
        postsComments = this.props.gamerClub.postscomments
    }

    return (
       <ul>
            {postsComments.map((item, index) => (
                <div style={{borderColor: "#000", borderStyle:"solid", borderWidth: "1px", marginTop: 10, marginBottom: 5}}>

                    {console.log(postsComments[index])}

                    <div style={{fontSize: 18, fontFamily:"monospace"}}>
                        <b>{postsComments[index].post.posttitle}</b>
                    </div>
                
                    <div style={{fontSize: 14, fontFamily: "monospace"}}>

                        {postsComments[index].post.postdescription}


                    </div>

                    <Collapsible trigger="Start here">
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                    </Collapsible>





                </div>
                            

            ))}





       </ul>
    );
  }
}

export default PostsComponent;