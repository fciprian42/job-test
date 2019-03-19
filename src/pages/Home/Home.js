import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Form, ButtonToolbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { moviesConstants } from '../../constants/moviesConstants';
import { moviesList} from '../../movies';
import './Home.scss';
import comet from '../../images/comet.svg';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      byPage: 12,
      categorySelected: null,
      likes: false,
      sort: false,
      pov: false,
      categories: [],
      movies: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    const { dispatch } = this.props;

    moviesList.then(response => {
      response.map(res => {
        const category = res.category;

        if (!this.state.categories.includes(category)) {
          this.setState({
            categories: [
              ...this.state.categories,
              category
            ],
            movies: response
          });
        }
      });

      dispatch({type: moviesConstants.GET_MOVIES, data: response});
    });
  }

  onChangePOV = () => {
    this.setState({
      pov: !this.state.pov
    });
  };

  onSort = () => {
    this.setState({
      sort: !this.state.sort
    });

    if (!this.state.sort) {
      this.state.movies.sort(function(a,b){
        return a.title.localeCompare(b.title);
      })
    } else {
      this.state.movies.sort(function(a,b){
        return b.title.localeCompare(a.title);
      })
    }
  };

  handleChange = (e) => {
   if (e && e.target.value) {
     const category = e.target.value;

     moviesList.then(response => {
       let i = 0;
       let newMovies = [];

       for (i; i < this.state.byPage; i++) {
         if (response[i] && response[i].category === category) {
           newMovies.push(response[i]);
         }
       }

       this.setState({
         movies: newMovies,
         categorySelected: category
       });
     })
   }
  };

  handleChangePerPage = (e) =>  {
    if (e && e.target.value) {
      const n = e.target.value;

      moviesList.then(response => {
        let i = 0;
        let newMovies = [];

        for (i; i < n; i++) {
          if (this.state.categorySelected) {
            if (response[i] && response[i].category === this.state.categorySelected) newMovies.push(response[i]);
          } else {
            if (response[i]) newMovies.push(response[i]);
          }
        }

        response.map(res => {
          const category = res.category;

          if (!this.state.categories.includes(category)) {
            this.setState({
              categories: [
                ...this.state.categories,
                category
              ]
            });
          }
        });

        this.setState({
          movies: newMovies,
          byPage: n
        });
      })
    }
  };

  onSortLikes = () => {
    this.setState({
      likes: !this.state.likes
    });

    if (!this.state.likes) {
      this.state.movies.sort(function(a,b){
        if (a.likes < b.likes) { return 1; }
        if (a.likes > b.likes) { return -1; }
        return 0;
      });
    } else {
      this.state.movies.sort(function(a,b){
        if (a.likes < b.likes) { return -1; }
        if (a.likes > b.likes) { return 1; }
        return 0;
      });
    }
  };

  showRemove = (e) => {
    //console.log(e.target)
  };

  removeMovie = (e) => {
    if (e && e.currentTarget) {
      const movie = e.currentTarget.dataset.name;
      let newMovies = this.state.movies;

      for (let i = 0; i < newMovies.length; i++) {
        let obj = newMovies[i];

        if (obj.title === movie) {
          newMovies.splice(i, 1);
        }
      }

      this.setState({
        ...this.state,
        movies: newMovies
      });
    }
  };

  render() {
    const { categories, movies, sort, pov, likes } = this.state;

    return (
      <>
        <div className='logo'>
          <img src="https://fontmeme.com/permalink/190319/1cc3c7350fe72b7a6e8df006bfa66359.png" width={200}/>
          <h2>Un coup d'oeil plus grand</h2>
        </div>
        <section id='films' className='films'>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em'}}>
            <div>
              <Form style={{display: 'flex'}}>
                <Form.Group style={{ textAlign: 'left', marginRight: 10 }}>
                  <Form.Label>Catégories</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange}>
                    <option defaultValue>----</option>
                    {categories && categories.length > 0 && categories.map((categorie, key) => {
                      return (
                        <option value={categorie} key={key}>
                          {categorie}
                        </option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group style={{ textAlign: 'left' }}>
                  <Form.Label>Par page</Form.Label>
                  <Form.Control as="select" onChange={this.handleChangePerPage} value={this.state.byPage}>
                    <option>4</option>
                    <option>8</option>
                    <option>12</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div></div>
            <div>
              <ButtonToolbar>
                <Button style={{ marginRight: 5 }} variant={sort ? 'primary' : 'secondary'} onClick={() => {this.onSort()}}>
                  <FontAwesomeIcon icon="font" />
                </Button>
                <Button style={{ marginRight: 5 }} variant={pov ? 'primary' : 'secondary'} onClick={() => {this.onChangePOV()}}>
                  <FontAwesomeIcon icon="th-list" />
                </Button>
                <Button variant={likes ? 'primary' : 'secondary'} onClick={() => {this.onSortLikes()}}>
                  <FontAwesomeIcon icon="star-half-alt" />
                </Button>
              </ButtonToolbar>
            </div>
          </div>
          <div className={pov ? 'pov' : ''} style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
            {movies && movies.length > 0 ? movies.map((movie, key) => {
              const parsingTitle = movie.title.split(' ').join('-').toLowerCase();
              const image = require('../../images/films-cover/' + parsingTitle + '.jpg');
              const likes = (movie.dislikes - movie.likes) / movie.likes * 100;
              const dislikes = 100 - (-likes);

              return (
                <Card className={pov ? 'povCard' : 'no-pov'} key={key} data-index={key} onMouseEnter={this.showRemove}>
                  <div className='remove' id={`remove-${key}`} data-name={movie.title} onClick={(e) => {this.removeMovie(e)}}>
                    <FontAwesomeIcon icon="times" />
                  </div>
                  <Card.Img style={{ maxHeight: 210 }} variant="top" src={image} />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold'}}>{movie && movie.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{movie && movie.category}</Card.Subtitle>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{color: '#909090', margin: 5}}>
                        <FontAwesomeIcon icon="thumbs-up" /> {movie.likes >= 1000 ? `${(movie.likes / 1000).toFixed(1)} K` : movie.likes}
                      </div>
                      <div style={{color: '#909090',  margin: 5}}>
                        <FontAwesomeIcon icon="thumbs-down" /> {movie.dislikes}
                      </div>
                    </div>
                    <div>
                      <div />
                      <div />
                    </div>
                  </Card.Body>
                </Card>
              );
            }) : ''}
          </div>
        </section>
        <footer>
          <div></div>
          <div>
            Made by <strong>François Cipriani</strong>
          </div>
          <div className='footer-infos'>
            <div style={{ marginRight: 15, marginTop: 8 }}>
              <a href='https://www.linkedin.com/in/fciprian42/' target='_blank'>
                <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
              </a>
            </div>
            <div className='comet'>
              <a href='https://app.comet.co/freelancer/profile/d2k9zR7wYP' target='_blank'>
                <img src={comet} className='comet-img' alt="comet.co"/>
              </a>
            </div>
          </div>
        </footer>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

export default connect(mapStateToProps)(Home);
