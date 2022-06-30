import React from 'react'
import { Button } from 'react-bootstrap'
import SidebarOption from './SidebarOption'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
 

function Sidebar() {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const handleLogout = (e) => {
        dispatch(logout())
    }
    return (
        <div>
            <i className="fab fa-twitter fa-2x text-info pad"></i>
            <Link  to="/">
                <SidebarOption active icon={<i className="fas fa-home fa-2x"></i>} text="Home"/>
            </Link>

            <Link to="/explore">
                <SidebarOption icon={<i className="fas fa-hashtag fa-2x"></i>} text="Explore"/>
            </Link>

            <Link to="/notifications">
                <SidebarOption icon={<i className="far fa-bell fa-2x"></i>} text="Notifications"/>
            </Link>

            <Link to="/messages">
                <SidebarOption icon={<i className="far fa-envelope fa-2x"></i>} text="Messages"/>
            </Link>

            <Link to="/bookmarks">
                <SidebarOption icon={<i className="far fa-bookmark fa-2x"></i>} text="Bookmarks"/>
            </Link>

            <Link to="/lists">
                <SidebarOption icon={<i className="fas fa-list fa-2x"></i>} text="Lists"/>
            </Link>
            
            <Link to={`profile/${userInfo.id}`}>
                <SidebarOption icon={<i className="far fa-user fa-2x"></i>} text="Profile"/>
            </Link>
            
            <Link to="/more">
                <SidebarOption icon={<i className="fas fa-ellipsis-h fa-2x"></i>} text="More"/>
            </Link>

            <Button variant="outline-info" block className="sidebar_tweet">Tweet</Button>

            <Button onClick={handleLogout} variant="outline-info" block className="sidebar_tweet">
                <i className="fas fa-sign-out-alt">Logout</i>
            </Button>
        </div>
    )
}

export default Sidebar
