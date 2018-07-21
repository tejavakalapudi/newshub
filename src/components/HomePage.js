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

class HomePage extends React.Component {

    state = {
        itemsLiked : []
    }

    onClickLikeButton = ( itemLiked ) => {

        if( this.state.itemsLiked.indexOf( itemLiked ) === -1 ){

            this.setState({
                itemsLiked : [ ...this.state.itemsLiked, itemLiked ]
            });

        } else {

            this.setState({
                itemsLiked : this.state.itemsLiked.filter( item => item !== itemLiked )
            });

        }

    }

    render(){

        return (
            <div className = "home__container" >

                <ScrollToTop />

                <Container>

                    {
                        this.props.articles && this.props.articles.map( ( article ) => {

                            return (
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
                                        { `Published on ${ moment( article.TIMESTAMP ).format( "MMMM Do YYYY" ) } by ${ article.PUBLISHER }` }
                                    </Col>
                                    <Col 
                                        xs="2" 
                                        className= {`text__align-right home__article-like ${ this.state.itemsLiked.indexOf( article.ID ) > -1 ? "active" : "" }`}
                                        onClick = { () => { this.onClickLikeButton( article.ID ); } }
                                    >
                                        <FaHeart size={20} />
                                    </Col>

                                </Row>
                            )

                        })
                    }

                </Container>

            </div>
        );
    }
}; 


const mapStateToProps = ( store ) => {

    return {
        articles : selectedArticles( store.articles, store.filters )
    }

}

export default connect( mapStateToProps )( HomePage );