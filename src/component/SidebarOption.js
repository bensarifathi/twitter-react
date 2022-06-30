import React from 'react'
import { Col, Row } from 'react-bootstrap'

function SidebarOption({active=false,icon, text=""}) {
    return (
        <Row className={`sidebarOption m-2 ${active && 'sidebarOption__active'}`}>
            <Col md={2}>{icon}</Col>
            <Col><h3>{text}</h3></Col>
        </Row>
    )
}

export default SidebarOption
