import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';

export default class MainMenu extends Component {
    createMenuItems = function (items) {
        return items.map(this.createItem);
    };

    createItem = function (item) {
        if (item.items !== undefined) {
            return (
                <NavDropdown title={item.name} id="basic-nav-dropdown" key={item.name}>
                    {
                        item.items.map((menu, index) =>
                            <NavDropdown.Item href={menu.url} key={index}>
                                {menu.name}
                            </NavDropdown.Item>
                        )
                    }
                </NavDropdown>
            )
        }
        return (
            <Nav.Link href={item.url} key={item.url}>
                {item.name}
            </Nav.Link>
        )
    };

    render() {
        let menu = this.props.menu;

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {this.createMenuItems(menu)}
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
