import React, { Component } from "react";
import M from "materialize-css";

import axios from "axios";


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
                <div style={{}}>

                    {console.log(postsComments[index])}

                    {postsComments[index].post.posttitle}




                </div>
                            

            ))}





       </ul>
    );
  }
}

export default PostsComponent;