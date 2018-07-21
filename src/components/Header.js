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
import { FaHeart, FaSearch, FaNewspaperO, FaSort } from "react-icons/lib/fa";
import { IoGrid  } from "react-icons/lib/io";

class HeaderComponent extends React.Component{

    state = {
        headerClass : "header__container mx-auto",
        listOfPublishers : [],
        listOfCategories : [],
        selectedPublisher : "None",
        selectedCategory : "None",
        sortedOrder : "",
        activeTab : ""
    }

    isMobileDevice = () => {
        return ( typeof window.orientation !== "undefined" ) || ( navigator.userAgent.indexOf( 'IEMobile' ) !== -1 );
    };

    renderMenuDropdown = () => (
        <Nav>
            <UncontrolledDropdown nav inNavbar className = "dropdown-navitem">
                <DropdownToggle nav caret className = "navlink">
                    Menu
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <NavLink to = "/" exact={true} activeClassName = "is-active" className = "dropdown-navlink">Home</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink to = "/projects" activeClassName = "is-active" className = "dropdown-navlink">Projects</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink to = "/buyersguide" activeClassName = "is-active" className = "dropdown-navlink">Buyers Guide</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink to = "/contactus" activeClassName = "is-active" className = "dropdown-navlink" >Contact</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink to = "/admin" activeClassName = "is-active" className = "dropdown-navlink" >Admin</NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    );

    renderMenuBar = () => (
        <Nav>
            <NavItem className = "projects_navitem">
                <NavLink to = "/" exact={true} activeClassName = "is-active" className = "navlink navlink-right">Home</NavLink>
            </NavItem>
            <NavItem className = "projects_navitem">
                <NavLink to = "/projects" activeClassName = "is-active" className = "navlink navlink-right">Projects</NavLink>
            </NavItem>
            <NavItem className = "projects_navitem">
                <NavLink to = "/buyersguide" activeClassName = "is-active" className = "navlink navlink-right">Buyers Guide</NavLink>
            </NavItem>
            <NavItem className = "projects_navitem">
                <NavLink to = "/contactus" activeClassName = "is-active" className = "navlink navlink-right" >Contact</NavLink>
            </NavItem>
            <NavItem className = "projects_navitem">
                <NavLink to = "/admin" activeClassName = "is-active" className = "navlink navlink-right" >Admin</NavLink>
            </NavItem>
        </Nav>
    );

    renderNavs = () => {

        if( this.isMobileDevice() ){

            return this.renderMenuDropdown();

        } else {

            return this.renderMenuBar();

        }

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

    }

    render(){
        
        window.onscroll = () => {

            var header = document.getElementById( "myHeader" );
            var sticky = header && header.offsetTop;

            if ( ( window.pageYOffset > sticky ) ) {

                this.setState({
                    headerClass : "header__container mx-auto sticky"
                });
    
            } else {
    
                this.setState({
                    headerClass : "header__container mx-auto"
                });
    
            }

        };

        return(
            <div id="myHeader" className = { this.state.headerClass }>
                <Container>
                    <Row className = "justify-content-center header__navbar" >
                        {/*
                            <Col xs="11" md="3" className="text__align-center">
                                <input 
                                    type="search" 
                                    placeholder="search"
                                    className = "header__search"
                                    onChange = { this.handleTextFilter }
                                />
                            </Col>

                            <Col xs="11" md="3" className="text__align-center">
                                <select 
                                    type = "select" 
                                    name = "publisherFilter" 
                                    id = "selectedPublisher"
                                    value = { this.state.selectedPublisher }  
                                    onChange = { this.handlePublisherFilter }
                                    className = "header__filter" 
                                >
                                    <option value = "" >None</option>
                                    {
                                        this.state.listOfPublishers.map( ( publisher ) => {
                                            
                                            return ( <option value = { publisher }>{ publisher }</option> );

                                        })

                                    }
                                </select>
                            </Col>

                            <Col xs="11" md="3" className="text__align-center">
                                <select 
                                    type = "select" 
                                    name = "categoryFilter" 
                                    id = "selectedCategory"
                                    value = { this.state.selectedCategory }  
                                    onChange = { this.handleCategoryFilter }
                                    className = "header__filter" 
                                >
                                    <option value = "" >None</option>
                                    {
                                        this.state.listOfCategories.map( ( category ) => {
                                            
                                            return ( <option value = { category }>{ category }</option> );

                                        })

                                    }
                                </select>
                            </Col>

                            <Col xs="11" md="3" className="text__align-center">
                                <select 
                                    type = "select" 
                                    name = "sort" 
                                    id = "sortedOrder"
                                    value = { this.state.sortedOrder }  
                                    onChange = { this.handleSortFilter }
                                    className = "header__filter" 
                                >
                                    <option value = "newToOld" >New to Old</option>
                                    <option value = "oldToNew" >Old to New</option>
                                </select>
                            </Col>
                        */}
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
                        <Col xs = "2" className="text__align-center header__icon heart">
                            <FaHeart size={40} onClick={ () => { this.setActiveTab( "liked" ) } }/>
                        </Col>

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
        articles : store.articles
    }

}
    
export default connect( mapStateToProps )( HeaderComponent );


