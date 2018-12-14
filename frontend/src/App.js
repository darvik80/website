import React, {Component} from 'react';
import './App.css';
import {Container, Table, Row, Col} from 'react-bootstrap';
import MainMenu from './components/MainMenu';

import PieChart from 'react-minimal-pie-chart';
import EmailSendForm from "./components/EmailSend";


class App extends Component {
    constructor(args) {
        super(args);

        this.state = {
            isLoading: true
        };

        fetch('api/config.json')
            .then(response => response.json())
            .then(config => {
                this.setState({config: config, isLoading: false});
            });
    }

    render() {
        const {config, isLoading} = this.state;

        if (isLoading) {
            return <Container className="App" fluid>
                <header>Loading...</header>
            </Container>
        }

        return (
            <Container className="App" fluid>
                <MainMenu menu={config.menu}/>

                <EmailSendForm/>
                <Row>
                    <Col md={4}/>
                    <Col md={4}>
                        <PieChart
                            animation={true}
                            lineWidth={16}
                            paddingAngle={16}
                            rounded
                            data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                        />
                    </Col>
                    <Col md={4}/>
                </Row>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default App;
