import React from 'react';
import axios from 'axios';
import rating from '../data/users';
import map from 'lodash/map'

export default class Posts extends React.Component{
    constructor(props) {
	    super(props);
	    this.state = {posts: [], search: '', page: ''};

	    this.onChange = this.onChange.bind(this);
	} 

    componentWillMount() {
        this.PostsList();
    }

	PostsList() {
        axios.get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=7')
            .then((response) => {
                this.setState({posts: response.data});
            });
    }

    onChange(e){
    	e.preventDefault();
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                this.setState({posts: response.data});
            });
    	axios.get('https://jsonplaceholder.typicode.com/posts?userId='+e.target.value)
			.then((response) => {
    		let userPosts = response.data;
    		userPosts = userPosts.map(userPost => userPost.userId);
    		let filtered = this.state.posts.filter(post => userPosts.indexOf(post.userId) >= 0);
			this.setState({posts: filtered});
		})
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

        const options = map ( rating, (val,key)=>
			<option key={val} value={val}>{key}</option>
        );

        function loadPage(page){
            axios.get('https://jsonplaceholder.typicode.com/posts?_page='+page+'&_limit=7')
				.then((response) => {
					this.setState({posts: response.data});
			});
        }

        return(
        	<div id="layout-content" className="layout-content-wrapper">
                <div className="panel-list">
			        <form className="form-inline" id="search-post" onSubmit={this.handleSearch.bind(this)}>
		    			<input className="form-control searchInput" type="text" ref="searchItem" />
		    			<input className="btn btn-outline-success searchPost" type="submit" value="Search" />
		      		</form>
		      		<div className="row sort">
						<div className="col-md-6 col-md-offset-5">

						<span>Title : </span>
		      			<button className="sort-feature" onClick={this.sortPostsByTitle.bind(this, false)}>&uarr;</button>
        				<button className="sort-feature" onClick={this.sortPostsByTitle.bind(this, true)}>&darr;</button>
		      			<span>Id : </span>
				        <button className="sort-feature" onClick={this.sortPostsById.bind(this, true)}>&uarr;</button>
				        <button className="sort-feature" onClick={this.sortPostsById.bind(this, false)}>&darr;</button>
						</div>
					</div>


					<div className="row">
						<div className="col-md-6 col-md-offset-6">
							<label className="control-label">Filter by users</label>
							<select
								onChange={this.onChange}
								value={this.state.albumId}
								className="form-control select"
								name="albumId"
							>
								<option value="" disabled>Choose user</option>
                                {options}
							</select>
						</div>

					</div>
                	{ posts }
                	<div className="row">
						<div className="col-md-6 col-md-offset-4">
							<nav aria-label="Page navigation example">

								<ul className="pagination">
									<li onClick={ loadPage.bind(this, 1)}><a href="#"  >1</a></li>
									<li onClick={ loadPage.bind(this, 2)}><a href="#"  >2</a></li>
									<li onClick={ loadPage.bind(this, 3)}><a href="#"  >3</a></li>
									<li onClick={ loadPage.bind(this, 4)}><a href="#"  >4</a></li>
									<li onClick={ loadPage.bind(this, 5)}><a href="#"  >5</a></li>
									<li onClick={ loadPage.bind(this, 6)}><a href="#"  >6</a></li>
									<li onClick={ loadPage.bind(this, 7)}><a href="#"  >7</a></li>
									<li onClick={ loadPage.bind(this, 8)}><a href="#"  >8</a></li>
									<li onClick={ loadPage.bind(this, 9)}><a href="#"  >9</a></li>
									<li onClick={ loadPage.bind(this, 10)}><a href="#"  >10</a></li>
									<li onClick={ loadPage.bind(this, 11)}><a href="#"  >11</a></li>
									<li onClick={ loadPage.bind(this, 12)}><a href="#"  >12</a></li>
									<li onClick={ loadPage.bind(this, 13)}><a href="#"  >13</a></li>
									<li onClick={ loadPage.bind(this, 14)}><a href="#"  >14</a></li>
									<li onClick={ loadPage.bind(this, 15)}><a href="#"  >15</a></li>
								</ul>

							</nav>
						</div>
					</div>


                </div>
            </div>
        )
    }

  	handleSearch(e){
	    e.preventDefault();
	    this.onSearch(this.refs.searchItem.value);
	    let form = document.getElementById("search-post");
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
		});
		this.setState({posts: posts});
	}


	sortPostsById(desc = false){
		let posts = this.state.posts.sort((a, b) => (desc ? a.id : b.id) - (desc ? b.id : a.id));
		this.setState({posts: posts});
	}

}