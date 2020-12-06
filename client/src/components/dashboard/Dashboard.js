import React, { useEffect, useState } from 'react';
import './Dashboard.css'

import axios from 'axios';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

function Dashboard() {

    const [posts, setPosts] = useState([]); 
    const [anonymous, setAnonymous] = useState([]); 

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/elasticsearch/posts/all');
            if(data) {
                setPosts(data)
                setAnonymous(data.filter(post => post.author.toLowerCase() === 'anonymous').length);
            }                  
        })()
    }, [])
    
    const authorChartData = [ 
        { 
            author: 'Anonymous',
            amount: anonymous
        },
        { 
            author: 'Else',
            amount: posts.length - anonymous
        },
    ];

    let tagsChartData = [ 
        {
            tag: "Peadophile",
            amount: 0
        }, 
        {
            tag: "Weapons",
            amount: 0
        }, 
        {
            tag: "Trading",
            amount: 0
        }, 
        {
            tag: "No Tag",
            amount: 0
        } 
    ];
    if (posts) {
        posts.forEach(post => {
            if(post.tags.length === 0) tagsChartData[3].amount++
            post.tags.forEach(tag => {
                if(tag === "peadophile") tagsChartData[0].amount++;
                if(tag === "weapons") tagsChartData[1].amount++;
                if(tag === "trading") tagsChartData[2].amount++;
            })
        })
    }

    

    return (
        <div className="dashboard">
            <div className="firstLine">
                <div className="chart">
                    <h2>Author Statistics</h2>
                    <BarChart
                    width={500}
                    height={300}
                    data={authorChartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="author" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="purple" />
                    </BarChart>
                </div>
                <div className="chart">
                <h2>Labels Statistics</h2>
                    <BarChart
                    width={500}
                    height={300}
                    data={tagsChartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tag" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="green" />
                    </BarChart>
                </div> 
            </div>
        </div>
    )
}

export default Dashboard
