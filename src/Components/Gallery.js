import React, { Component } from 'react';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {photo: [], albumId: [], albums: [], photoIndex: 0,
            isOpen: false};
        this.onChange = this.onChange.bind(this);

    }

    onChange(e) {
        this.setState({albumId: Number(e.target.value)});
    }

    // onClick(id) {
    //     this.setState({albumId: id});
    // }

    albums(){
        return axios.get('https://jsonplaceholder.typicode.com/albums?_limit=10')
            .then( (response) => {
                this.setState({albums: response.data});
            });
    }

    componentDidMount() {
        this.PhotoList();
        this.albums();
    }

    PhotoList() {

        return axios.get('https://jsonplaceholder.typicode.com/photos?_limit=500')
            .then( (response) => {
                this.setState({photo: response.data});
            });
    }

    render() {
        const {photoIndex, isOpen} = this.state;
        const images = [];
        console.log('albumId', this.state.albumId);
        const photos = this.state.photo.filter(ph => !this.state.albumId || ph.albumId === this.state.albumId)
            .map((item, i) => {
                images.push(item.url);
                let title = '';

                let album = this.state.albums ? this.state.albums.find(album => album.id === item.albumId) : null;
                title = album ? album.title : 'загрузка...';

                return <div className="row photo" key={i}>
                    <div className="col-md-4">
                        <img src={item.thumbnailUrl} alt={item.title} key={i}/>
                        <button className="btn btn-primary preview"
                                type="button"
                                onClick={() => this.setState({ isOpen: true })}>
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
        
        // const albums = this.state.albums.map((album, i) => {
        //     const photosNmb = (this.state.photo.filter(photo => album.id === photo.albumId)).length
        //     return (
        //         <div key={i} className="container">
        //             <ul>
        //                 <li>{album.id} - {album.title} (
        //                     <span 
        //                     onClick={this.onClick.bind(this, album.id)}>
        //                         {photosNmb}
        //                     </span> photos)
        //                 </li>
        //             </ul>
        //         </div>
        //     )
        // })

        const albums = this.state.albums.map((album, i) => {
            const photosNmb = (this.state.photo.filter(photo => album.id === photo.albumId)).length
            return <option key={i} value={album.id}>
                        {album.id} - {album.title} ({photosNmb} photos)
                    </option>
        })

        return <div>
            <div className="container main">
                <div>
                    <h3>Albums List</h3>
                    <br />
                    {albums} 
                    <hr />
                </div>
                <div className="row">
                    <h3>Choose album</h3>
                    <select
                        onChange={this.onChange}
                        value={this.state.albumId}
                        name="albumId">
                            <option value="" disabled>Choose album</option>
                            {albums}
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