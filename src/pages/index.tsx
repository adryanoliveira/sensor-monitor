import React, { useState } from 'react';
import { Detail } from '../component/detail/Detail';
import { SensorList } from '../component/SensorList/SensorList';
import { SensorContext, Sensor, SensorContextProps } from '../context/SensorContext';
import Sensors from '../data/export.json';

import styles from './index.module.scss';

const IndexPage = () => {
  
  const sensors : Sensor[] = JSON.parse(JSON.stringify(Sensors));

  const [currentSensor, setCurrentSensor] = useState({} as Sensor);
  const value : SensorContextProps = {
    sensors: sensors,
    currentSensor: currentSensor,
    setCurrentSensor: setCurrentSensor  
  }
  

  return (    
    <div className={styles.container}>
      <SensorContext.Provider value={value}>
        <SensorList />
        <Detail />
      </SensorContext.Provider>
    </div>
  )

}

export default IndexPage
