import React, {Component} from 'react';
import { ListGroupItem } from 'react-bootstrap'
import FaUserSecret from 'react-icons/lib/fa/user-secret'
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';
import {CA_DASHBOARD, SERVER_URL,DEFAULT_IMAGE} from "../utils/constants.js";
import SweetAlert from 'sweetalert-react';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
class Proposal extends Component {
  constructor(props){
    super(props);
    this.state = {
        active: 0,
        choosedAudio:{soundtrack:{song: null}},
        selectedAudio: false,
        selectedProposal: false,
        type: "success",
        show: false,
        sweetAlertOnConfirm: () => {},
        sweetAlertMessage: "",
        sweetAlertTitle: ""
   };
   this.selectProposal = this.selectProposal.bind(this);
  }

  render(){
    let artist = this.props.proposal.artist;
    let artworks = this.props.proposal.artworks;
    return (
      <div>
        <SweetAlert
            show={this.state.show}
            type={this.state.type}
            title={this.state.sweetAlertTitle}
            text={this.state.sweetAlertMessage}
            onConfirm={this.state.sweetAlertOnConfirm}
        />
        <div className={`row ${this.state.selectedProposal ? "selectedProposal" : ""}`}>
          <hr/><hr/>
          <div className="col-sm-3" style={{textAlign: 'center'}}>
            <FaUserSecret size={60} color='#19708D' /><br/>
            <h3>{artist}</h3>
            <br/>
            <h4 className="">{this.state.choosedAudio.soundtrack.song || 'Escoge una canción'}</h4>
            <br/>
            { this.selectProposalButton() }
          </div>
          <div className="col-sm-9">
            <div href="#" className="">
              <div >
                <Coverflow
                  width={500}
                  height={380}
                  displayQuantityOfSide={2}
                  navigation={true}
                  enableHeading={false}
                  active={this.state.active}
                  >
                  {this.props.proposal.audios.map( audio => {
                    return (<img src={audio.cover || DEFAULT_IMAGE} alt={artist} data-action={()=>{
                      this.setState({
                        choosedAudio: audio,
                        selectedAudio: true
                      });
                    }} />)
                  })}

                </Coverflow>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><hr/>
      </div>
    );
  }
  selectProposal(){
    let choosedProposal = {notificationId: this.props.notification.id, proposalId: this.props.proposal.id};
    this.setState({
          type: "success",
          show: true,
          showModal: false,
          sweetAlertOnConfirm: () => {this.setState({show: false}); window.location = `#${CA_DASHBOARD}/convocatorias`; },
          sweetAlertMessage: "Es cogió la postulación satisfactoriamente",
          sweetAlertTitle: "Exito",
        });
    // $.ajax({
    //   method: 'POST',
    //   url: `${SERVER_URL}/comercial_agent/notifications/${notificationId}`,
    //   data: JSON.stringify(choosedProposal),
    // })
    // .done(( msg ) => {
    //     self.props.choosedProposal(this.props.proposal.id);
    //     self.setState({ selectedProposal:true});
    //
    //     this.setState({
    //       type: "success",
    //       show: true,
    //       showModal: false,
    //       sweetAlertOnConfirm: () => {this.setState({show: false}); window.location = `#${CA_DASHBOARD}/convocatorias`; },
    //       sweetAlertMessage: "Es cogió la postulación satisfactoriamente",
    //       sweetAlertTitle: "Exito",
    //     });
    //   })
    // .fail((err) => {
    //   console.error(err);
    //   this.setState({
    //     show: true,
    //     sweetAlertTitle: "Error Servidor",
    //     type: "error",
    //     sweetAlertMessage: `status: ${err.status} \nstatusText: ${err.statusText}`
    //   });
    // })

  }
  selectProposalButton() {
    if(this.props.notification.notification_type == "PR") {
      return (
        <button className="btn btn-primary" onClick={ this.selectProposal } >
          Escoger esta obra como ganadora
        </button>
      )
    } else {
      return (
        <span>
          <FaThumbsOUp/> 36 &nbsp;
          <button type="button" className="btn btn-primary disabled" aria-label="Left Align">
            Publica debe haber un empate para poder Escoger
          </button>
        </span>
        )
    }
  }

};



export default Proposal;