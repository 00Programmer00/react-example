import React from 'react';
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '40%',
    height: '60%',
    margin: '20px'
};

class Users extends React.Component{
    constructor(props) {
	    super(props);
	    this.state = {users: []};
	} 

    componentWillMount() {
        this.UsersList();
    }

	UsersList() {
        return axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                this.setState({users: response.data});
            });
    }

    render(){
		const markers = this.state.users.map((user, i) => {
			 return <Marker key={i}
                    title={user.name}
                    position={{lat: user.address.geo.lat, lng: user.address.geo.lng}} />
        });

		const users = this.state.users.map((user, i) => {
            return <div key={i} className="container col-md-4 col-md-offset-6">
                <ul className="list-group" id="users">
                    <li className="list-group-item">{user.id} - {user.name}</li>
                </ul>
            </div>
        });

        return(
          <div>	
        	<div id="layout-content" className="layout-content-wrapper">
                <div className="panel-list">
                	{ users }
                </div>
            </div>
            <Map google={this.props.google} initialCenter={{lat: 32.885353,lng: 13.180161}} 
            		zoom={4} style={style}>
                {markers}
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>w</h1>
                    </div>
                </InfoWindow>
            </Map>
          </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDCrDrJz3xHuWwZ86WssYdlILvvKL9JARc'
})(Users);