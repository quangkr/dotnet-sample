import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default function Home() {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [sendError, setSendError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

    const hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5022/chathub")
        .configureLogging(LogLevel.Information)
        .build();

    hubConnection.start().then(a => {
        // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
        // if (hubConnection.connectionId) {
        //     hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
        // }
        setBtnDisabled(false);
    });

    useEffect(() => {
        hubConnection.on('ReceiveMessage', (user, message) => {
            setReceivedMessages([
                ...receivedMessages,
                `${user} says ${message}`,
            ]);
        });
    }, [hubConnection, receivedMessages]);

    const sendMsgHandler = () => {
        hubConnection
            .invoke("SendMessage", user, message)
            .catch(function (err) {
                setSendError(err.toString());
            });
    }

    return (
        <Container fluid="md">
            <Row>
                <Col className="px-3 px-md-0">
                    <Form className="mx-auto">
                        <Form.Group className="mb-3" controlId="chat.user">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="chat.message">
                            <Form.Label>Mesasge</Form.Label>
                            <Form.Control as="textarea" value={message} onChange={e => setMessage(e.target.value)} />
                        </Form.Group>
                        {sendError ? <div className="error">{sendError}</div> : undefined}
                        <Button disabled={btnDisabled} onClick={sendMsgHandler}>Send</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            receivedMessages.map(m => (
                                <ListGroup.Item>{m}</ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}