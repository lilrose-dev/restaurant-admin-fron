import '../category/category.css'
import React, { PureComponent } from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORY, RESTAURANT, BRANCH, FOOD, ORDER } from '../../Query';
import { VictoryPie } from 'victory';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from 'recharts';

  


function Dashboard() {
    const { data: categories } = useQuery(CATEGORY)
    const { data: restaurants } = useQuery(RESTAURANT)
    const { data: branches } = useQuery(BRANCH)
    const { data: food } = useQuery(FOOD)
    const { data: orders } = useQuery(ORDER)
    

    let now = new Date()
    let year = now.getFullYear()
        
    const data = [
        {
            name: 'Restaurants',
            year: year,
            inc: restaurants && restaurants.restaurants.length + 900,
            amt: restaurants && restaurants.restaurants.length,
        },
        {
            name: 'Branches',
            year: year,
            inc: branches && branches.branches.length + 900,
            amt: branches && branches.branches.length,
        },
        {
            name: 'Foods',
            year: year,
            inc: food && food.food.length + 900,
            amt: food && food.food.length,
        },
        {
            name: 'Orders',
            year: year,
            inc: orders && orders.orders.length + 900,
            amt: orders && orders.orders.length,
        }
    ];

    const allData = [
        { x: "Foods", y: food && food.food.length },
        { x: "Restaurants", y: restaurants && restaurants.restaurants.length },
        { x: "Branches", y: branches && branches.branches.length },
        { x: "Categories", y: categories && categories.categories.length },
        { x: "Orders", y: orders && orders.orders.length },
    ]
    

  return (<div>
        <div style={{ width: '100%', height: 300, display: 'block' }}>
            <h2 className="heading">The statistics</h2>
            <ResponsiveContainer>
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="inc" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="year" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    

        <div className='piechart' style={{height: 620}}>
            <VictoryPie
                data={allData}
                colorScale={['blue', 'yellow', 'red', 'pink', 'orange']}
                radius={100}
            />
        </div>  
    </div>


  );
}
export default Dashboard;