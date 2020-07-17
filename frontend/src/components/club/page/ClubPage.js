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
            height: 150,
            width: "auto",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
            // width: 200,
            // height: "auto"
        }
    }

    return (


      <div class="row">

        <div class="col s3" style={{height: "100%", background: "grey"}}>
          {/* sidebar info */}


            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Doom_Cover.jpg/220px-Doom_Cover.jpg" style={styles.image}/>

          <div>
            <b> Backseat Gamerz</b>
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