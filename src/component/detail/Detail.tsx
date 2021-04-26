import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { Sensor, SensorContext } from '../../context/SensorContext';

import styles from './style.module.scss';

export const Detail = () => {
    
    function dateToString( data : Date){
        var dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    function getFormatedData(sensor: Sensor){
        var data : {date: string, data:{ y: number, name: string }[]}[] = [];

        const findIndex = (date : string) => {

            var position = -1;

            data.map((information : {date: string, data:{ y: number, name: string }[]}, index: number) => {
                if(information.date == date) {
                    position = index;
                }
            })

            return position;
        }

        sensor?.sampling?.map((sample: string[]) => {
            var date = new Date(Number(sample[1]) * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var formatDate = dateToString(date);
            
            if (date.getMinutes() == 0 || Number(sample[0]) != 0 ) {
                let position = findIndex(formatDate);

                if(position == -1) {
                    data.push({
                        date: formatDate,
                        data: []
                    })
                }
                
                position = findIndex(formatDate);

                if(data[position].data.length > 0) {
                    //if(data[position].data[data[position].data.length - 1].y != Number(sample[0])){
                        data[position].data.push({
                            y: Number(sample[0]),
                            name: formattedTime
                        }); 
                    //}
                }else{
                    data[position].data.push({
                        y: Number(sample[0]),
                        name: formattedTime
                    }); 
                }                          
            }

        })

        return data;
    }

    function findIndex(date : string, data : {date: string, data:{ y: number, name: string }[]}[]){

        var position = -1;

        data?.map((information : {date: string, data:{ y: number, name: string }[]}, index: number) => {
            if(information.date == date) {
                position = index;
            }
        })

        return position;
    }

    const { currentSensor } = useContext(SensorContext);    
    const [formatedData, setFormatedData] = useState(getFormatedData(currentSensor));
    const [date, setDate] = useState(formatedData[0]?.date);  
    const [data, setData] = useState(formatedData[findIndex(date, formatedData)]?.data);

    useEffect(() => {

        setFormatedData(getFormatedData(currentSensor))
        setDate(formatedData[0]?.date);
        setData(formatedData[findIndex(date, formatedData)]?.data);

    }, [currentSensor])

    return (
        <div className={styles.graphContainer}>
            <div className={styles.Date}>
                {
                    formatedData.map((value) => {
                        let dataToSet = formatedData[findIndex(value.date, formatedData)].data;

                        return (
                            <button 
                                type="button" 
                                onClick={ () => {
                                    setData(dataToSet) 
                                    setDate(value.date);
                                }} 
                                className={date === value.date ? styles.selected : ''} 
                                key={value.date}
                            >
                                {value.date}
                            </button>
                        )
                    })
                }
            </div>
            <ResponsiveContainer width="80%" height="80%">
                <LineChart
                    data={data}
                >
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <Legend />
                    <XAxis dataKey="name" name="Valor"/>
                    <YAxis name="Hora" />
                </LineChart>

            </ResponsiveContainer>
        </div>
    )
}