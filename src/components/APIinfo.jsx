import React, { useState, useEffect } from 'react';
import Banlist from './Banlist';
import Gallery from './Gallery'
const APIinfo = () => {
    const [data, setData] = useState('');
    const [prevImage, setPrevImage] = useState([]);
    const [banList, setBanList] = useState([]);
    const [image, setImage] = useState('');
    const [id, setID] = useState('');
    const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
    const API_ID = `https://api.thecatapi.com/v1/images/${id}`;
    const API_URL = `https://api.thecatapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=${true}`;
    const callAPI = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            setImage(json[0].url);
            setID(json[0].id);
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_ID);
            const json = await response.json();
            console.log(API_ID);
            if(banList.includes(json.breeds[0].name) || banList.includes(json.breeds[0].weight.imperial) || banList.includes(json.breeds[0].origin) || banList.includes(json.breeds[0].life_span))
            {
                callAPI();
            }  
            else{
                setPrevImage((image) => [...image, json]);
                setData(json);
            }
        };
        fetchData();
    }, [id]);
    const addBanList = (event) => {
        if(banList.length === 0)
        {
            setBanList(banList.concat(event));
        }
        else if(banList.includes(event))
        {
            return;
        }
        else{
            setBanList(banList.concat(event));
        }
    }
    const removeBanList = (event) => {
        const updatedBanList = banList.filter((ban) => ban !== event);
        setBanList(updatedBanList);
    }
    return (
        <div>
            <Gallery images ={prevImage}/>
            <div className='middle-container'>
            {image ? (<img src ={image} width = "500" height="500"/>) : (<div></div>)}
                {data ? (
                    <div>
                    <button onClick={() => addBanList(data.breeds[0].name)}>{data.breeds[0].name}</button>
                    <button onClick={() => addBanList(data.breeds[0].weight.imperial)}>{data.breeds[0].weight.imperial} lbs</button>
                    <button onClick={() => addBanList(data.breeds[0].origin)}>{data.breeds[0].origin}</button>
                    <button onClick={() => addBanList(data.breeds[0].life_span)}>{data.breeds[0].life_span}</button>
                    </div>
                ) : (<div></div>)}
                <button onClick={callAPI}>Discover!</button>
            </div>
            <Banlist list = {banList} removeBan = {removeBanList}/>
        </div>
    );
};

export default APIinfo;