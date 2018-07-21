import React from "react";
import { 
    Container, 
    Jumbotron,
    Row, 
    Col,
    Nav,
    NavItem,
    Navbar,
    Button,
    Input 
} from "reactstrap";
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import selectedArticles from "../selectors/articles";
import moment from 'moment';
import { FaHeart } from "react-icons/lib/fa";
import  { setLikedArticles } from "../actions/articles";
import Header from "./Header";

class HomePage extends React.Component {

    state = {
        itemsLiked : []
    }

    onClickLikeButton = ( itemLiked ) => {

        if( this.state.itemsLiked.indexOf( itemLiked ) === -1 ){

            this.setState({

                itemsLiked : [ ...this.state.itemsLiked, itemLiked ]

            }, () => this.props.dispatch( setLikedArticles( this.state.itemsLiked ) ));

            
        } else {

            this.setState({

                itemsLiked : this.state.itemsLiked.filter( item => item !== itemLiked )

            }, () => this.props.dispatch( setLikedArticles( this.state.itemsLiked ) ));

        }

    }

    renderArticleDiv = ( article ) => {

        return(
            <Row className = "home__article-container">

                <h1 className = "col-12">
                    <a target="_blank" href={ article.URL } className = "home__article-title">
                        { article.TITLE }
                    </a> 
                </h1>
                <Col xs="12">
                    { `URL : ${ article.URL }` }
                </Col>
                <Col xs="10">
                    <span> { `Published on ${ moment( article.TIMESTAMP ).format( "MMMM Do YYYY" ) } by ` } </span>
                    <span className="home__article-publisher"> { article.PUBLISHER } </span>
                </Col>
                <Col 
                    xs="2" 
                    className= {`text__align-right home__article-like ${ this.state.itemsLiked.indexOf( article.ID ) > -1 ? "active" : "" }`}
                    onClick = { () => { this.onClickLikeButton( article.ID ); } }
                >
                    <FaHeart size={20} />
                </Col>

            </Row>
        );

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

                    {

                        this.props.match.path === "/liked" && this.props.articles && this.props.articles.filter( ( article ) => {

                            if( this.props.match.path === "/liked" ){

                                return this.props.itemsLiked.indexOf( article.ID ) > -1;

                            } else {

                                return true;

                            }

                        }).map( ( article ) => {

                            return this.renderArticleDiv( article );

                        })

                    }


                    {
                        this.props.match.path !== "/liked" && this.props.articles && this.props.articles.map( ( article ) => {

                            return this.renderArticleDiv( article );

                        })
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