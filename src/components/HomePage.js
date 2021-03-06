import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import selectedArticles from "../selectors/articles";
import moment from 'moment';
import { FaHeart } from "react-icons/lib/fa";
import  { setLikedArticles } from "../actions/articles";
import Header from "./Header";

class HomePage extends React.Component {

    state = {
        itemsLiked : [],
        articlesToShow : 10
    }

    onClickLikeButton = ( itemLiked ) => {

        /* 
            - Check if item already has been liked.
            - If not add it to the itemsLiked Array.
            - If it has already been added, remove it from the arrey to trigger dislike feature.
            - Dispatch an action to update liked items in the store.
        */

        if( this.state.itemsLiked.indexOf( itemLiked ) === -1 ){

            this.setState({

                itemsLiked : [ ...this.state.itemsLiked, itemLiked ]

            }, () => this.props.dispatch( setLikedArticles( [ ...this.state.itemsLiked, itemLiked ] ) ));

            
        } else {

            this.setState({

                itemsLiked : this.state.itemsLiked.filter( item => item !== itemLiked )

            }, () => this.props.dispatch( setLikedArticles( this.state.itemsLiked ) ));

        }

    }

    renderArticleDiv = ( article ) => {

        return(
            <Row className = "home__article-container">

                <Col xs="12">
                    <h1>
                        <a target="_blank" href={ article.URL } className = "home__article-title">
                            { article.TITLE }
                        </a> 
                    </h1>
                </Col>

                <Col xs="12">
                    { `URL : ${ article.URL }` }
                </Col>

                {/*
                    Use Moment.js to generate date in a more readable format
                    http://momentjs.com/
                */}
                <Col xs="10" className="home__article-publisher">
                    <span> { `Published on ${ moment( article.TIMESTAMP ).format( "MMMM Do YYYY" ) } by ` } </span>
                    <span className="home__article-publisher-name"> { article.PUBLISHER } </span>
                </Col>

                <Col 
                    xs="2" 
                    className= {`text__align-right home__article-like ${ this.state.itemsLiked.indexOf( article.ID ) > -1 ? "active" : "" }`} 
                >
                    <FaHeart size={20} 
                        onClick = { () => { this.onClickLikeButton( article.ID ); } }
                    />
                </Col>

            </Row>
        );

    }

    /*
        Update the state with latest number of articlesToShow
    */

    showMore = ( e ) => {

        e.preventDefault();

        this.setState({
            articlesToShow : this.state.articlesToShow + 10
        })

    }

    /*
        Button to display more items on the page
    */
    renderShowMoreButton = () => {

        if( ( this.props.match.path !== "/liked" && this.props.articles.length > this.state.articlesToShow ) || ( this.props.match.path === "/liked" && this.props.itemsLiked.length > this.state.articlesToShow ) ){

            return(
                <Row className="justify-content-center home__showmore-button">
                    <Col xs="3" className="text__align-center">
                        <Button color="danger" onClick = { this.showMore } >More</Button>
                    </Col> 
                </Row>
            )

        }

    }

    render(){

        return (
            <div className = "home__container" >

                <ScrollToTop />

                <Header 
                    push = { this.props.history.push }
                    path = { this.props.match.path } 
                />

                <Container>


                    {/*
                        Display only 10 articles per request to optimize the rendering speed
                        Liked page should only render liked articles in the session
                    */}
                    {

                        this.props.match.path === "/liked" && this.props.articles && 
                        this.props.articles.filter( ( article ) => this.props.itemsLiked.indexOf( article.ID ) > -1 )
                        .slice( 0, this.state.articlesToShow )
                        .map( ( article ) => this.renderArticleDiv( article ) )

                    }


                    {
                        this.props.match.path !== "/liked" && this.props.articles && 
                        this.props.articles.slice( 0, this.state.articlesToShow )
                        .map( ( article ) => this.renderArticleDiv( article ) )
                    }

                    {   
                        this.renderShowMoreButton()
                    }

                </Container>

            </div>
        );
    }
}; 


const mapStateToProps = ( store ) => {

    return {
        articles : selectedArticles( store.articles.list, store.filters ),
        itemsLiked : store.articles.liked
    }

}

export default connect( mapStateToProps )( HomePage );