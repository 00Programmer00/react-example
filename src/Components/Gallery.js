import React, { Component } from 'react';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {photo: [],albumId: '', photoIndex: 0,
            isOpen: false};
        this.onChange = this.onChange.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }

    componentDidMount() {
        this.UserList();
        this.albums();
    }

    UserList() {

        return axios.get('https://jsonplaceholder.typicode.com/photos?albumId=1&albumId=2', )
            .then( (response) => {
                console.log(response.data);
                this.setState({photo: response.data});
            });
    }

    albums() {
        return axios.get('https://jsonplaceholder.typicode.com/albums', )
            .then( (response) => {
                console.log(response.data);
                this.setState({albums: response.data});
            });

    }

    render() {
        const {
            photoIndex,
            isOpen,
        } = this.state;
        const images = [];
        const photos = this.state.photo.map((item, i) => {
            images.push(item.url);
            let title = '';

            axios.get('https://jsonplaceholder.typicode.com/albums?id='+item.albumId).then((response) => {
                title = response.data[0].title;
            });

            return <div className="row photo" key={i}>
                <div className="col-md-4">
                    <img src={item.thumbnailUrl} alt={item.title} key={i}/>
                    <button className="btn btn-primary preview"
                            type="button"
                            onClick={() => this.setState({ isOpen: true })}
                    >
                        Preview
                    </button>
                </div>
                <div className="col-md-8">
                    <h3>Album : {title}</h3>
                    <hr/>
                    <h3>Description : {item.title}</h3>
                </div>

            </div>


        });

        return <div>
            <div className="container main">
                <div className="row">
                    <label className="control-label">Sort by albums</label>
                    <select
                        onChange={this.onChange}
                        value={this.state.albumId}
                        className="form-control"
                        name="albumId"
                    >
                        <option value="" disabled>Choose album</option>
                        <option value='album 1'>album 1</option>
                        <option value='album 2'>album 2</option>

                    </select>
                </div>

                {photos}
            </div>
            {isOpen &&
            <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() => this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                })}
                onMoveNextRequest={() => this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                })}
            />
            }
        </div>
    }
}