import React, { Component } from 'react'

export default class Favourites extends Component {
    
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:'All Genres',
            movies:[],
            currText:'',
            currPage:1,
            limit:5            
        }
    }

    componentDidMount(){
        let genreids ={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10759:"Action & Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",10762:"Kids",9648:"Mystery",10763:"News",10764:"Reality",10765:"Sci-Fi & Fantasy",10766:"Soap",10767:"Talk",10768:"War & Politics",37:"Western"};
        let data=JSON.parse(localStorage.getItem('movies-app') || "[]");

        let temp=[];
        data.forEach((obj)=>{
            if(!temp.includes(genreids[obj.genre_ids[0]])){
                temp.push(genreids[obj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres')
        this.setState({
            movies:[...data],
            genres:[...temp],
            currgenmovies:[...data]
        })
    }

    sortPopularityAsc=()=>{
        let temp=this.state.movies;
        temp.sort((a,b)=>{
            return a.popularity-b.popularity;
        })

        this.setState({
            movies:[...temp]
        })
    }

    sortPopularityDsc=()=>{
        let temp=this.state.movies;
        temp.sort((b,a)=>{
            return a.popularity-b.popularity;
        })

        this.setState({
            movies:[...temp]
        })
    }

    sortRatingAsc=()=>{
        let temp=this.state.movies;
        temp.sort((a,b)=>{
            return a.vote_average-b.vote_average;
        })

        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDsc=()=>{
        let temp=this.state.movies;
        temp.sort((b,a)=>{
            return a.vote_average-b.vote_average;
        })

        this.setState({
            movies:[...temp]
        })
    }

    nextPage=(len)=>{
        if(this.state.currPage!=len){
            this.setState({
                currPage:this.state.currPage+1
            })
        }
    }

    prevPage=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            })
        }
    }

    setPage=(value)=>{
        
        this.setState({
            currPage:value
        })
        
    }

    deleteFavourite=(id)=>{
        let temp=this.state.movies.filter((movieObj)=>( movieObj.id!=id));
        this.setState({
            movies:[...temp]
        })
        localStorage.setItem('movies-app',JSON.parse.stringify(this.state.movies))
    }

    render() {
        let genreids ={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10759:"Action & Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",10762:"Kids",9648:"Mystery",10763:"News",10764:"Reality",10765:"Sci-Fi & Fantasy",10766:"Soap",10767:"Talk",10768:"War & Politics",37:"Western"};
        let filterArr=this.state.movies;

        if(this.state.currText===''){
            filterArr=this.state.movies;
        }else{
            filterArr=this.state.movies.filter((movieObj)=>{
                let title=movieObj.original_title || movieObj.original_name;
                title=title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            });
        }

        if(this.state.currgen!=='All Genres'){
            filterArr=this.state.movies.filter((movieObj)=>(genreids[movieObj.genre_ids[0]]==this.state.currgen));
        }

        let pages=Math.ceil(filterArr.length/this.state.limit);
        let parr=[];
        for(let i=1; i<=pages; i++){
            parr.push(i);
        }
        
        let si=(this.state.currPage-1)*this.state.limit;
        let ei=si+this.state.limit;
        filterArr=filterArr.slice(si,ei);
        console.log(si,ei);

        return (
        <div>
            <>
                <div className="main">
                    <div className='row'>
                        <div className='col-3'>
                            <ul className="list-group favourites-genres">
                                {
                                    this.state.genres.map((value)=>(
                                        this.state.currgen===value?
                                        <li class="list-group-item" style={{background:'#3330E4', color:'white', fontWeight:'bold'}}>
                                            <a href='#' onClick={()=> this.setState({currgen:value})} style={{textDecoration:'none',color:'white' }}>{value}</a>
                                        </li>:
                                        <li class="list-group-item" style={{color:'#3330E4'}}>
                                            <a href='#' onClick={()=> this.setState({currgen:value})} style={{textDecoration:'none'}} >{value}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-9' style={{padding:'0px 20px'}}>
                            <div className='row'>
                                <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>{this.setState({currText:e.target.value})}}/>
                                <input type="number" className='input-group-text col' placeholder='Row Count' value={this.state.limit} onChange={(e)=>{this.setState({limit:parseInt(e.target.value)})}}/>
                            </div>
                            <div className='row'>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">TITLE</th>
                                            <th scope="col">GENRE</th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDsc}></i> POPULARITY <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDsc}></i> RATING <i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                            <th scope='col'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                filterArr.map((movieObj)=>(
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title} style={{width:'8rem', marginRight:'1rem'}}/>{movieObj.original_title}{movieObj.original_name}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-outline-danger" onClick={()=>this.deleteFavourite(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                    
                                                ))
                                            }
                                            
                                    </tbody>
                                </table>
                            </div>
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <nav aria-label="Page navigation example" className='row'>
                                    <ul class="pagination" >
                                        <li class="page-item"><a class="page-link" href="#" onClick={this.prevPage}>Previous</a></li>
                                        {
                                            parr.map((value)=>(
                                                this.state.currPage===value?<li class="page-item"><a class="page-link" href="#" onClick={()=>this.setPage(value)} style={{backgroundColor:'#3330e4', fontWeight:'bold', color:'white'}}>{value}</a></li>:
                                                <li class="page-item"><a class="page-link" href="#" onClick={()=>this.setPage(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.nextPage(parr.length)}>Next</a></li>                                
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </>
        </div>
        )
    }
}
