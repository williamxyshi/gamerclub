import React from 'react'; 


class ClubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }


  render() {

      var styles = {
        image: {
            height: 230,
            width: "auto",
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

    return (


      <div class="row" style={{height:"92vh"}}>

        <div class="col s3" style={{height: "100%", borderRight: "1px solid grey", display: "inline-block",
                 }}>
 


            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/220px-Doom_Cover.jpg" style={styles.image}/>
        
            <div style={{ fontSize: "2.7vh", fontFamily:"monospace", textAlign: "center"}}>

              <b>Backseat West Gamer Club</b>

            </div>


            <div style={{marginTop: 10, fontFamily:"Courier New"}}>
              <b>Please play until: </b>

                <div style={{borderColor: "#000"}}>


                </div>
            </div>




 
            
           

     






        </div>

        <div class="col s9">
          {/* main page info (discussion etc) */}
         
        </div>

      </div>


    );
  }
}

export default ClubPage;