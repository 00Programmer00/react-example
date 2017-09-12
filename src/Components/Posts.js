import React from 'react';
import axios from 'axios';

export default class Posts extends React.Component{
    constructor(props) {
	    super(props);
	    this.state = {posts: [], search: ''};
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
		      		<div>
		      			<span>Title</span>
		      			<span className="sort-feature" 
		      					onClick={this.sortPostsByTitle.bind(this, false)}>&uarr;</span>
        				<span className="sort-feature" 
        						onClick={this.sortPostsByTitle.bind(this, true)}>&darr;</span>
		      			<span>Id</span>
				        <span className="sort-feature" 
				        		onClick={this.sortPostsById.bind(this, true)}>&uarr;</span>
				        <span className="sort-feature" 
				        		onClick={this.sortPostsById.bind(this, false)}>&darr;</span>
		      		</div>
                	{ posts }
                </div>
            </div>
        )
    }

  	handleSearch(e){
	    e.preventDefault();
	    this.onSearch(this.refs.searchItem.value);
	    var form = document.getElementById("search-post");
	    form.reset();
	}

	onSearch(item){        
	  this.setState({search: item});
	}

	searchPosts(posts) {
	    if (this.state.search === '') {
	      return posts;
	    } else {
	      return posts.filter(post => {
	        if (post.title && post.title.indexOf(this.state.search) >= 0) {
	          console.log('search', post.title);
	          return true;
	        }
	      })
	    }
	}

	sortPostsByTitle(desc = false){
		let posts = this.state.posts.sort(function(a, b){
		    if(a.title < b.title) return desc ? 1 : -1;
		    if(a.title > b.title) return desc ? -1 : 1;
	    	return 0;
		})
		this.setState({posts: posts});
	}

	// sortPostsById(desc = false){
	// 	let posts = this.state.posts.sort((a, b) => a.id - b.id);
	// 	this.setState({posts: posts});
	// }

	sortPostsById(desc = false){
		let posts = this.state.posts.sort((a, b) => (desc ? a.id : b.id) - (desc ? b.id : a.id));
		this.setState({posts: posts});
	}

	// sortPostsById(desc = false){
	// 	if (desc === true){
	// 		function compareNumbers(a, b){
	// 	    	return a - b;
	// 		}
	// 	} else {
	// 		function compareNumbers(a, b){
	// 	    	return b - a;
	// 		}
	// 	}
	// 	let posts = this.state.posts.sort(compareNumbers);
	// 	this.setState({posts: posts});
	// }
}