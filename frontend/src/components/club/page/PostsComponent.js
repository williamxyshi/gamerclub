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
                <div style={{borderColor: "#000", borderStyle:"solid", borderWidth: "1px", borderRadius: 8,  marginTop: 10, marginBottom: 5, 
                        paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5}}>

                    {console.log(postsComments[index])}

                    <div style={{fontSize: 18, fontFamily:"monospace", marginBottom: 10}}>
                        <b>{postsComments[index].post.posttitle}</b>
                    </div>
                
                    <div style={{fontSize: 14, fontFamily: "monospace", marginBottom: 10}}>

                        {postsComments[index].post.postdescription}


                    </div>

      
                    <Collapsible trigger="Show Comments" triggerWhenOpen="Hide Comments" triggerStyle={{fontFamily: "Courier New", fontSize: 13}}>
                        {postsComments[index].comments.map((item, commentIndex) => (
                            <div style={{fontFamily: "monospace"}}>

                                {postsComments[index].comments[commentIndex].commentbody}


                            </div>
                        ))}
                    </Collapsible>
              







                </div>
                            

            ))}





       </ul>
    );
  }
}

export default PostsComponent;