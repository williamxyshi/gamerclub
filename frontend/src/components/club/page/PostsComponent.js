import React, { Component } from "react";
import M from "materialize-css";

import axios from "axios";

import Popup from "reactjs-popup";

import Collapsible from 'react-collapsible';





const test = []


class PostsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            postComment : "",
            currentPost: null,
            currentClub: null,
        }

        this.onCommentChangeHandler = this.onCommentChangeHandler.bind(this)
        this.onPostHandler = this.onPostHandler.bind(this)
      }

    onPostHandler(){

        if(this.state.postComment == ""){
            M.toast({html: 'comment cannot be empty', classes: 'rounded'})

            return
        }

        const postData = {
            clubid: this.state.currentClub,
            postid: this.state.currentPost,
            commentbody: this.state.postComment
        }
        console.log(postData)

        axios.post('http://localhost:4000/games/addcomment', postData)
        
        .then(res => {
            
                this.props.onGamerClubUpdate(res.data);
                M.toast({html: 'comment posted!', classes: 'rounded'})
            
               
            
              } ).catch(err =>{
                console.log(err)
              });


    }


    onCommentChangeHandler(e){
        this.state.postComment = e.target.value;
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
        /**
         * this flips it so that it's in chronological order :) 
         */
        postsComments = this.props.gamerClub.postscomments.reverse()
    }

    var openText = "Show Comments"
    var hideText = "Hide Comments"

    return (
       <ul style={{overflowY: "scroll"}}>
            {postsComments.map((item, index) => (
                <div style={{borderColor: "#000", borderStyle:"solid", borderWidth: "1px", borderRadius: 8,  marginTop: 10, marginBottom: 5, 
                        paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5}}>

                    <div style={{fontSize: 20, fontFamily:"monospace", marginBottom: -5}}>
                        <b>{postsComments[index].post.posttitle}</b>
                    </div>

                    <div style={{marginBottom: 10, fontSize: 10, marginLeft: 0}}>
                        posted by: {postsComments[index].post.posteremail}
                    </div>
                
                    <div style={{fontSize: 16, fontFamily: "monospace", marginBottom: 10}}>

                        {postsComments[index].post.postdescription}


                    </div>

                    <Popup
                        trigger={<button className="button"> Write a Comment </button>}
                        modal
                        closeOnDocumentClick
                    >
                        <div class="input-field inline" style={{width: "30%", height: "10%", marginBottom: -10}}>
                            <input id={index} type="text" data-length="10" onChange={this.onCommentChangeHandler}></input>
                            <label for={index} style={{fontFamily: "monospace", fontSize: 14}}>Your Comment</label>
                        </div> 

                        <button style={{marginTop: 10}} onClick={
                            (event) => {

    
                                this.state.currentClub = postsComments[index].post.clubid
                                this.state.currentPost = postsComments[index].post.postid

                                this.onPostHandler()

                            }

                        } value = {index}>post</button>
                    </Popup>

                                
             
            
              
                    <Collapsible trigger={
                        openText
                        } triggerWhenOpen={
                            hideText
                        } triggerStyle={{fontFamily: "Courier New", fontSize: 13}}>
                        {postsComments[index].comments.map((item, commentIndex) => (
                            <div style={{fontFamily: "Courier New", marginLeft: 15, marginRight: 15, padding: 4, marginTop: 8, marginBottom: 8,
                                            borderColor: "#808080", borderStyle:"solid", borderWidth: "1px", borderRadius: 8, }}>


                                <b>{postsComments[index].comments[commentIndex].commentbody}</b>

                                <div style={{marginLeft: 25}}>
                                    {postsComments[index].comments[commentIndex].commenteremail}
                                </div>


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