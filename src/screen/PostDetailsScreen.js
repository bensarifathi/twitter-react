import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import Post from '../component/Post'
import Comment from '../component/Comment'
import { LinkContainer } from 'react-router-bootstrap'

function PostDetailsScreen() {
    return (
        <FormContainer>
            <LinkContainer to="/">
                        <Button variant="outline-info">Back</Button>
            </LinkContainer>
            <Row>
                <Col md={1} className="m-3">
                    <Image src="https://s1.qwant.com/thumbr/0x380/a/0/c4becf848533e0deb0e843facda341658dc77dcc1bdb6ea6dd0a6ed69ec84a/VIR_53451_4860_que_personaje_serias_de_snk_ampliado.jpg?u=https%3A%2F%2Fstatics.viralizalo.com%2Fvirs%2F2016%2F01%2FVIR_53451_4860_que_personaje_serias_de_snk_ampliado.jpg%3Fcb%3D7156&q=0&b=1&p=0&a=1" alt="pic" className="avatar"/>
                </Col>
                <Col md={10}>
                <p className="my-3 mr-3"><strong>Fathi</strong>{` `}
                <i className="fas fa-certificate verified"></i>{` `}
                <small>@nicky Larson</small></p>
                <p>Some quick example text to build on the card title and make up the bulk
                of the card's content.</p>
                <Image src="https://s1.qwant.com/thumbr/0x380/b/f/bb5699273011f517cd5fab765e9b8d36a2c7246c89811b8c99183bcef1211b/1589676267_982_SNK-Wallpapers-2020.jpg?u=https%3A%2F%2Fbrokenpanda.net%2Fwp-content%2Fuploads%2F1589676267_982_SNK-Wallpapers-2020.jpg&q=0&b=1&p=0&a=1" alt="content" fluid rounded/>
                <Row>
                    <Col><i className="far fa-comment comment__icon"> 14</i></Col>
                    <Col><i className="fas fa-retweet retweet__icon"> 5</i></Col>
                    <Col><i className="far fa-heart heart__icon"> 3</i></Col>
                </Row>
                <Comment />
                <Post />
                </Col>
            </Row>
        </FormContainer>
    )
}

export default PostDetailsScreen
