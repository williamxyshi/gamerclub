import React, { Component } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import DatePicker from "react-datepicker";
import axios from "axios";

import styles from "./AdminPage.css"


import M from "materialize-css";

var newDate = ""


class AdminPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

            newDescription : "",
            newDate: "",
            currentClub: null,



        }

        this.handleOutput = this.handleOutput.bind(this) 
        this.onSaveDeadline = this.onSaveDeadline.bind(this)
      }


      componentDidMount() {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems,  {
            onSelect:function(){
              var date = String(instances[0].date).split(" ");

            
           
            newDate = date[1] + " " + date[2] + ", " + date[3]
              

          
            }
          });

        let el = document.querySelector('.tabs');
        let instance = M.Tabs.init(el, {});


        if(!this.props.gamerClub.club.clubname){

            let id = localStorage.getItem( 'clubid' )
    
    
            axios.post('http://localhost:4000/games/getclub', {
                clubid: id
            })
            
            .then(res => {
                    this.props.onGamerClubUpdate(res.data)

        
        
            
                } ).catch(err =>{
                console.log(err)
                });
        } else {


        }

    }

    onSaveDeadline(){

        var canPass = true

        if(newDate == ""){
            canPass = false
            M.toast({html: 'please select a date', classes: 'rounded'})

        }

        if(this.state.newDescription == ""){
            canPass = false
            M.toast({html: 'please enter a description', classes: 'rounded'})

        }

        if(canPass){

            const postData = {
                clubid: this.state.currentClub,
                newdeadline: newDate,
                deadlinedescription: this.state.newDescription
            }
            console.log(postData)
    
            axios.post('http://localhost:4000/games/changedeadline', postData)
            
            .then(res => {
                
                    this.props.onGamerClubUpdate(res.data);
                    M.toast({html: 'club updated!', classes: 'rounded'})
                
                   
                
                  } ).catch(err =>{
                    console.log(err)
                  });
    

        }

        

    }


    handleOutput(e){
        this.state.newDescription = e.target.value
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
            }
        }
    
		return (
            <div style={{ height: "75vh"}} className="container halign-wrapper" >
            
                  <div style={{marginTop: 45}}className="col s12 left-align">
                        <h5>
                            <b style = {styles.text}>edit club settings</b>
                        </h5>
                    </div>


                    <div>
                        <div class="col s12">
                            <ul class="tabs" style={{fontFamily:"Courier New"}}>
                                <li class="tab col s3"><a class="active" href="#test1">Deadline Settings</a></li>
                                <li class="tab col s3"><a href="#test2">Test 2</a></li>
                                <li class="tab col s3"><a href="#test3">Test 3</a></li>
                                <li class="tab col s3"><a href="#test4">Test 4</a></li>

                            </ul>
                        </div>
                        <div id="test1">
                            
                                    <div class="input-field col s6">
                                        <b style={{fontFamily: "Courier New"}}>Deadline Description:</b>
                                        <input style={{fontFamily:"monospace"}} id="input_text" type="text" onChange={this.handleOutput}/>
                                    </div>

                                    <div class="input-field col s6" style={{fontFamily: "Courier New"}}>
                                        <b>Deadline Date:</b>
                                        <input type="text" class="datepicker" 
                                        
                                        style={{width: "25%", marginLeft: 10, fontFamily: "monospace"}}/>


                  
                                    </div>

                                    <div className="col s12 center-align" style={{marginTop: 10}}>
                                        <a class="waves-effect waves-light btn" style={{
                                            background: "#fff",
                                            marginRight: 5,  
                                            marginLeft: 5,     
                                            color: "#000",
                                            fontFamily: "monospace"
                                        }}>Cancel</a>


                                        <button class="waves-effect waves-light btn" 

                                            // onClick={ (event) => {
                                            //     console.log("click")
                                            // }}

                                            onClick={
                                                (event) => {

                                                    this.state.currentClub = this.props.gamerClub.club.id
                                                    this.onSaveDeadline()
                                                
                                                }
                                                }                                                
                                               
                                            
                                            style={{
                                                background: "#000",
                                                marginRight: 5,  
                                                marginLeft: 5,     
                                                fontFamily: "monospace"        
                                            }}>Save</button>
                                    </div>

                        </div>

                        <div id="test2" class="col s12">Test 2</div>
                        <div id="test3" class="col s12">Test 3</div>
                        <div id="test4" class="col s12">Test 4</div>

                    </div>



                    














         



            





            </div>
                
        
		);
	}
}
export default withRouter(AdminPage);