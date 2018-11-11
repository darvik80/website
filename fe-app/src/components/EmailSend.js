import React from 'react';
import {Button, Form, Alert} from 'react-bootstrap';

function showMessage(message) {
    if (message !== "") {
        return <Alert variant="success">{message}</Alert>
    }

    return "";
}


export default class EmailSendForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                mailFrom: "darvik80@gmail.com",
                mailTo: "darvik80@gmail.com",
                subject: "Hello",
                message: "Hi, Darvik"
            },
            status: ""
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });

    }

    handleSubmit(event) {
        var component = this;

        fetch("http://localhost:3000/api/sendMessage.json", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json'
            },
            //body: JSON.stringify(this.state.data)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            component.setState({status: data.status});
        });
        event.preventDefault();
    }


    render() {
        const {status, data} = this.state;

        console.table(this.state);

        return (

            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formSendEmailCtrl" bsPrefix="text-right">
                    {showMessage(status)}
                </Form.Group>

                <Form.Group controlId="formSendEmail" bsPrefix="text-left">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        name="mailFrom"
                        type="email"
                        placeholder="Enter from email"
                        onChange={this.handleInputChange}
                        value={data.mailFrom}
                    />

                    <Form.Label>To</Form.Label>
                    <Form.Control
                        name="mailTo"
                        type="email"
                        placeholder="Enter to email"
                        onChange={this.handleInputChange}
                        value={data.mailTo}
                    />

                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        name="subject"
                        type="text"
                        placeholder="Enter subject"
                        onChange={this.handleInputChange}
                        value={data.subject}
                    />
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        name="message"
                        type="textarea"
                        onChange={this.handleInputChange}
                        value={data.message}
                    />
                </Form.Group>

                <Form.Group controlId="formSendEmailCtrl" bsPrefix="text-right">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        );
    }

}