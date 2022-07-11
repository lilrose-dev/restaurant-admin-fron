
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../App.css'

function Menu() {


    return(<>
    <div className="left">
        <h2 className='heading'>Admin panel</h2>
        <div className="menu">
            <NavLink className={'menu_link'} to={'/'}><div className="link link_dashboard">Dashboard</div></NavLink>
            <NavLink className={'menu_link'} to={'/category'}><div className="link link_category">Category</div></NavLink>
            <NavLink className={'menu_link'} to={'/restaurant'}><div className="link link_restaurant">Restaurant</div></NavLink>
            <NavLink className={'menu_link menu_link--branch'} to={'/branch'}><div className="link link_branch">Branch</div></NavLink>
            <NavLink className={'menu_link menu_link--food'} to={'/food'}><div className="link link_food">Food</div></NavLink>
            <NavLink className={'menu_link menu_link--order'} to={'/order'}><div className="link link_order">Order</div></NavLink>
            
        </div>
        
    </div>
    </>)

} 

export default Menu;