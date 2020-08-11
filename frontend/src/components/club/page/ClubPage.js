import React from 'react'; 

import M from "materialize-css";
import axios from "axios";
import { Link, Redirect, withRouter } from "react-router-dom";


import PostsComponent from './PostsComponent';


const testMembers = [
  {
    name: "william Shifdfdaslkfdjaskldfjklsa;jfklasjkdflja;slfjlksd",
    isAdmin: true
  }, {
    name: "cheesecanoes",
    isAdmin: false
  },{
    name: "bro moment live",
    isAdmin: false
  },{
    name: "genator",
    isAdmin: false
  },
]

function Blank(props){
  return(
    <span></span>
  )
}

function Admin(props){
  return(
    <b>[Admin] </b>
  )
}


function AdminButton(props){
  if(props.isAdmin){
    return(
      <button class="waves-effect waves-light btn" 

      style={{
        background: "#000"
      }}
      
      onClick={
        (event) => {

          props.history.push("/adminpage")
        }

      }>Manage Club</button>
    )
  } else {
    return(
      <Blank />
    )
  }
}

function IsAdmin(props){
  if(props.isAdmin){
    return(
      <Admin />
    )
  } else {
    return(
      <Blank />
    )
  }
}



class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      reachedChecked: false,
    };
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.toggleCheckbox = this.toggleCheckbox.bind(this);

    }

  componentDidMount() {

    let collapsible = document.querySelectorAll(".collapsible");

    M.Collapsible.init(collapsible, {});

    if(!this.props.gamerClub.club.clubname){

      console.log("no gamerr club")
      let id = localStorage.getItem( 'clubid' )

      console.log(id)


      axios.post('http://localhost:4000/games/getclub', {
          clubid: id
      })
      
      .then(res => {
              this.props.onGamerClubUpdate(res.data)
    
  
      
          } ).catch(err =>{
          console.log(err)
          });
    }
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  toggleCheckbox(){

    this.setState({
      reachedChecked: true
    })


    axios.post('http://localhost:4000/games/toggledeadline', {
        clubid: this.props.gamerClub.club.id
      })
      
      .then(res => {
              this.props.onGamerClubUpdate(res.data)


      
          } ).catch(err =>{
          console.log(err)
          });

      }





  render() {

      var styles = {
        image: {
            height: 230,
            width: "auto",
            maxWidth: 300,
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            marginBottom: 10,
            
            display: "block"
        
        },
        clubName: {
  

          marginTop: 15,
          display: "inline-block",
          textAlign: "center",

        }
    }


    let deadlineDescription = "no description provided"

    if(this.props.gamerClub.club.deadlinedescription != "" && this.props.gamerClub.club.deadlinedescription != null){
      deadlineDescription = this.props.gamerClub.club.deadlinedescription
    }

    let deadlineDate = "no date provided"

    if(this.props.gamerClub.club.currentdeadline != "" && this.props.gamerClub.club.currentdeadline != null){
      deadlineDate = this.props.gamerClub.club.currentdeadline
    }

    this.state.reachedChecked = false;

    //prevents crash
    if(this.props.gamerClub.club.reachedDeadline){

      for(let i = 0; i < this.props.gamerClub.club.reachedDeadline.length; i++){
        let user = this.props.gamerClub.club.reachedDeadline[i]

        if(user.email == this.props.user.email){
          this.state.reachedChecked = true;
        }


      }
    }

    var membersList = []
    if(this.props.gamerClub.club.members){
      membersList = this.props.gamerClub.club.members
    }

    var isUserAdmin = false;
    for(var i = 0; i < membersList.length; i ++){
      let member = membersList[i]

      if(member.email == this.props.user.email){
   
        isUserAdmin = member.isadmin == "true";
      }
    }



    return (


      <div class="row" style={{height:"92vh"}}>

        <div class="col s3" style={{height: "100%", borderRight: "1px solid grey", display: "inline-block",
                 }}>
 
 

            <img src={this.props.gamerClub.club.gameurl} style={styles.image}/>
        
            <div style={{ fontSize: "2.7vh", fontFamily:"monospace", textAlign: "center", marginTop: -10}}>

                <b>{this.props.gamerClub.club.clubname}</b>

            </div>


            <div style={{marginTop: -5, fontFamily:"Courier New", marginLeft: 10}}>
              <b>Reach This Checkpoint: </b>

                <div style={{borderColor: "#000", borderStyle:"solid", borderWidth: "2px", padding: 5}}>

                  {deadlineDescription}
                </div>

                <b>By: {deadlineDate}</b>
           
                <div style={{marginTop: 10, marginBottom: 10}}>

  
                       <label>
                          <input type="checkbox" class="filled-in" checked = {this.state.reachedChecked} onChange={this.toggleCheckbox}/>
                          <span> <b>Have you played this far yet?</b></span>
                        </label>
                </div>
                
            </div>

            <ul class="collapsible">

                 {/* 
                
                Details Collabsable section 
                
                */}
              <li>
                <div class="collapsible-header"><i class="material-icons">info</i> <span style={{fontFamily:"monospace"}}>Club Details</span></div>
                <div class="collapsible-body">
                  <span>
              <b style={{fontFamily: "monospace"}}>Currently Playing:</b> <span style={{fontFamily: "Courier New"}}>{this.props.gamerClub.club.currentgame}</span> <br/>
                    <b style={{fontFamily: "monospace"}}>Checkpoints Reached:</b> <span style={{fontFamily: "Courier New"}}>2</span> <br/>

              <b style={{fontFamily: "monospace"}}>Started Playing:</b> <span style={{fontFamily: "Courier New"}}>{this.props.gamerClub.club.startedplaying}</span> <br/>

                  
                  </span>
                  </div>
              </li>

                {/* 
                
                Members list Collapsable section
                
                */}
              <li>
                <div class="collapsible-header"><i class="material-icons">person</i><span style={{fontFamily:"monospace"}}>Members</span></div>
                <div class="collapsible-body">
                  <span>
                      <ul>
                        {membersList.map((item, index) => (
                          <div style={{fontFamily:"Courier New", whiteSpace: "nowrap", overflow: "hidden"}}>
                              ⚬ {/* medium small white dot emoji */}
                              <IsAdmin isAdmin={membersList[index].isadmin == "true"}/>
                              {membersList[index].username}


                          </div>
                            

                          ))}
                      </ul>
                    
                    
                    </span>
                  </div>
              </li>

                 {/* 
                
                HISTORY collapsable section
                
                */}
              <li>
                <div class="collapsible-header"><i class="material-icons">history</i><span style={{fontFamily:"monospace"}}>History</span></div>
                <div class="collapsible-body">
                  
                  <span>
                    <b style={{fontFamily: "monospace"}}>Date Created:</b> <span style={{fontFamily: "Courier New"}}>08-03-2020</span> <br/>
                    <b style={{fontFamily: "monospace"}}>Number of Posts:</b> <span style={{fontFamily: "Courier New"}}>300</span> <br/>

                  
                  </span>
                
                
                
                </div>
              </li>
            </ul>


            <AdminButton isAdmin={isUserAdmin} history = {this.props.history}/>



        </div>

        <div class="col s9" style={{overflowY: "scroll", height: "100%"}} >
          <PostsComponent gamerClub={this.props.gamerClub}  onGamerClubUpdate = {this.props.onGamerClubUpdate} style={{overflowY: "scroll"}}>
         </PostsComponent>
        </div>

      </div>


    );
  }
}

export default withRouter(ClubPage);