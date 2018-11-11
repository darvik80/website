import React from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    createMenuItems = function(items) {
        return items.map(this.createItem);
    };

    createItem = function(item) {
        if (item.items !== undefined) {
            return <NavDropdown title={item.name} id="basic-nav-dropdown">
                {item.items.map((i) => <NavDropdown.Item href={i.url}>{i.name}</NavDropdown.Item>)}
            </NavDropdown>
        }
        return <Nav.Link href={item.url}>{item.name}</Nav.Link>
    };

    render() {
        let menu = this.props.menu;

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {this.createMenuItems(menu)}
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
