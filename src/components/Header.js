import React from "react";
import { connect } from "react-redux";
import { 
    Navbar, 
    Nav, 
    NavItem, 
    Container,
    Row,Col, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { setPublisherFilter, setCategoryFilter, setTextFilter, setSortFilter } from "../actions/filters";
import { FaHeart, FaSearch, FaNewspaperO, FaSort, FaHome } from "react-icons/lib/fa";
import { IoGrid  } from "react-icons/lib/io";

class HeaderComponent extends React.Component{

    state = {
        listOfPublishers : [],
        listOfCategories : [],
        selectedPublisher : "None",
        selectedCategory : "None",
        sortedOrder : "",
        activeTab : ""
    }

    handleTextFilter = ( e ) => {

        this.props.dispatch(
            setTextFilter( e.target.value )
        );

    }

    handlePublisherFilter = ( e ) => {

        this.props.dispatch(
            setPublisherFilter( e.target.value )
        );

        this.setState({
            selectedPublisher : e.target.value
        });

    }

    handleCategoryFilter = ( e ) => {

        this.props.dispatch(
            setCategoryFilter( e.target.value )
        );

        this.setState({
            selectedCategory : e.target.value
        });

    }

    handleSortFilter = ( e ) => {

        this.props.dispatch(
            setSortFilter( e.target.value )
        );

        this.setState({
            sortedOrder : e.target.value
        });

    }

    componentDidMount(){

        let listOfPublishers = [], 
            listOfCategories = [];
        
        this.props.articles.forEach( ( article ) => {

            if( listOfPublishers.indexOf( article.PUBLISHER ) === -1 ){

                listOfPublishers.push( article.PUBLISHER );

            } 

            if( listOfCategories.indexOf( article.CATEGORY ) === -1 ){

                listOfCategories.push( article.CATEGORY );

            } 

        });

        this.setState({
            listOfPublishers,
            listOfCategories
        });

    }

    setActiveTab = ( activeTab ) => {

        this.setState( ( prevState ) => ({

            activeTab : prevState.activeTab === activeTab ? "" : activeTab

        }));

        if( activeTab === "liked" ){

            if( this.props.likedArticles.length > 0 ){

                this.props.push( "/liked" );

            }

        }

        if( activeTab === "home" ){

            this.props.push( "/" );

        }

    }

    renderDropDown = () => {

        if( this.state.activeTab === "published" ){
            return (
                <Col xs="11" md="5" className="text__align-center header__icon-dropdown">
                    <select 
                        type = "select" 
                        name = "publisherFilter" 
                        id = "selectedPublisher"
                        value = { this.state.selectedPublisher }  
                        onChange = { this.handlePublisherFilter }
                        className = "header__dropdown-input" 
                    >
                        <option value = "" >Sort By Publisher</option>
                        {
                            this.state.listOfPublishers.map( ( publisher ) => {
                                
                                return ( <option value = { publisher }>{ publisher }</option> );

                            })

                        }
                    </select>
                </Col>
            )
        }

        if( this.state.activeTab === "category" ){

            return(
                <Col xs="11" md="5" className="text__align-center header__icon-dropdown">
                    <select 
                        type = "select" 
                        name = "categoryFilter" 
                        id = "selectedCategory"
                        value = { this.state.selectedCategory }  
                        onChange = { this.handleCategoryFilter }
                        className = "header__dropdown-input" 
                    >
                        <option value = "" >Sort By Category</option>
                        {
                            this.state.listOfCategories.map( ( category ) => {
                                
                                return ( <option value = { category }>{ category }</option> );

                            })

                        }
                    </select>
                </Col>
            )

        }

        if( this.state.activeTab === "sort" ){

            return(
                <Col xs="11" md="5" className="text__align-center header__icon-dropdown">
                    <select 
                        type = "select" 
                        name = "sort" 
                        id = "sortedOrder"
                        value = { this.state.sortedOrder }  
                        onChange = { this.handleSortFilter }
                        className = "header__dropdown-input" 
                    >
                        <option value = "" >Sort By Date</option>
                        <option value = "newToOld" >New to Old</option>
                        <option value = "oldToNew" >Old to New</option>
                    </select>
                </Col>
            )

        }

        if( this.state.activeTab === "search" ){
            
            return(
                <Col xs="11" md="5" className="text__align-center header__icon-dropdown">
                    <input 
                        type="search" 
                        placeholder="search"
                        className = "header__dropdown-input header__dropdown-search"
                        onChange = { this.handleTextFilter }
                    />
                </Col>
            )

        }

        if( this.state.activeTab === "liked" && this.props.likedArticles.length === 0 ){
            
            return(
                <Col xs="11" md="5" className="text__align-center header__icon-dropdown liked">
                    No liked articles!
                </Col>
            )

        }

    }

    render(){
        
        return(
            <div id="myHeader" className = "header__container mx-auto">
                <Container>
                    <Row className = "justify-content-center header__navbar" >

                        <Col xs = "2" className="text__align-center header__icon published">
                            <FaNewspaperO size={40} onClick={ () => { this.setActiveTab( "published" ) } }/>
                        </Col>
                        <Col xs = "2" className="text__align-center header__icon category">
                            <IoGrid size={40} onClick={ () => { this.setActiveTab( "category" ) } }/>
                        </Col>
                        <Col xs = "2" className="text__align-center header__icon sort">
                            <FaSort size={40} onClick={ () => { this.setActiveTab( "sort" ) } }/>
                        </Col>
                        <Col xs = "2" className="text__align-center header__icon search">
                            <FaSearch size={40} onClick={ () => { this.setActiveTab( "search" ) } }/>
                        </Col>
                        
                        {
                            this.props.path !== "/liked" && 
                            <Col xs = "2" className="text__align-center header__icon heart">
                                <FaHeart size={40} onClick={ () => { this.setActiveTab( "liked" ) } }/>
                            </Col>
                            
                        }

                        {
                            this.props.path === "/liked" && 
                            <Col xs = "2" className="text__align-center header__icon home">
                                <FaHome size={40} onClick={ () => { this.setActiveTab( "home" ) } }/>
                            </Col>
                            
                        }

                        {
                            this.renderDropDown()
                        }
                    </Row>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = ( store ) => {

    return {
        articles : store.articles.list,
        likedArticles : store.articles.liked
    }

}
    
export default connect( mapStateToProps )( HeaderComponent );


