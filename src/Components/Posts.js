import React from 'react';
import axios from 'axios';

export default class Posts extends React.Component{
    constructor(props) {
	    super(props);
	    this.state = {posts: [], search: ''};

	    this.onChange = this.onChange.bind(this);
	} 

    componentWillMount() {
        this.PostsList();
    }

	PostsList() {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                this.setState({posts: response.data});
            });
    }

    onChange(e){
    	axios.get('https://jsonplaceholder.typicode.com/posts?userId='+e.target.value)
			.then((response) => {
    			let userPosts = response.data;
    			console.log(userPosts);
		});
	}

    render(){
		const posts = this.searchPosts(this.state.posts).map((post, i) => {
            return <div key={i} className="container">
                <ul className="list-group" id="posts">
                    <li className="list-group-item">{post.id} - {post.title}
                        <hr/>
                        {post.body}
                    </li>
                </ul>
            </div>
        });

        return(
        	<div id="layout-content" className="layout-content-wrapper">
                <div className="panel-list">
			        <form className="form-inline" id="search-post" onSubmit={this.handleSearch.bind(this)}>
		    			<input className="form-control searchInput" type="text" ref="searchItem" />
		    			<input className="btn btn-outline-success searchPost" type="submit" value="Search" />
		      		</form>

					<label className="control-label">Sort by users</label>
					<select
						onChange={this.onChange}
						value={this.state.albumId}
						className="form-control select"
						name="albumId"
					>
						<option value="" disabled>Choose user</option>
						<option value='1'>user 1</option>
						<option value='2'>user 2</option>

					</select>

                	{ posts }
                </div>
            </div>
        )
    }

  	handleSearch(e){
	    e.preventDefault();
	    this.onSearch(this.refs.searchItem.value);
	    let form = document.getElementById("search-post");
	    console.log('search form submitted, value: ', this.refs.searchItem.value);
	    form.reset();
	}

	searchPosts(posts) {
	    if (this.state.search === '') {
	      return posts;
	    } else {
	      return posts.filter(post => {
	        if (post.title.indexOf(this.state.search) >= 0) {
	          return true;
	        }
	      })
	    }
	}

	onSearch(item){
	  this.setState({search: item});
	  console.log('onSearch func state: ', this.state);
	}
}