import React, {Component} from 'react';
import {Button, Form, Alert} from 'react-bootstrap';
import {EditorState, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class EmailSendForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                mailFrom: "",
                mailTo: "",
                subject: "",
            },
            status: "",
            editorState: EditorState.createWithContent(
                ContentState.createFromText("Hi, \r\n\r\nBest regards,")
            ),
            editorStyle: {
                border: '1px solid black',
                padding: '2px',
                borderRadius: '2px',
                height: '192px',
                width: '100%',

            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
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

    handleEditorStateChange(editorState) {
        this.setState({editorState});
    };

    handleSubmit(event) {
        let self = this;
        let request = {
            ...this.state.data,
            message: stateToHTML(this.state.editorState.getCurrentContent())
        };

        fetch("http://localhost:3001/api/sendMessage", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(request)
        }).then(res => res.json()).then((data) => self.setState({status: data.status}));

        event.preventDefault();
    }

    handleCloseMessage() {
        this.setState({status: ""});
    }

    showMessage(message) {
        if (message !== "") {
            return (
                <Alert
                    variant="success"
                    dismissible
                    onClose={this.handleCloseMessage}>{message}
                </Alert>
            );
        }

        return "";
    }

    render() {
        const {
            status,
            data,
            editorState,
            editorStyle
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formSendEmailNotification" bsPrefix="text-right">
                    {this.showMessage(status)}
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
                    <Form.Group controlId="formSendEmailEditor">
                        <Editor
                            editorStyle={editorStyle}
                            editorState={editorState}
                            onEditorStateChange={this.handleEditorStateChange}
                        />
                    </Form.Group>
                </Form.Group>

                <Form.Group controlId="formSendEmailCtrl" bsPrefix="text-right">
                    <Button variant="primary" type="submit">Send</Button>
                </Form.Group>
            </Form>
        );
    }

}