import { useContext } from "react"
import { Sensor, SensorContext } from "../../context/SensorContext";
import styles from './style.module.scss';


export const SensorList = () => {
    const sensorContext = useContext(SensorContext);
    
    function compare( a : Sensor, b : Sensor) {
        if ( a.addr < b.addr ){
          return -1;
        }
        if ( a.addr > b.addr ){
          return 1;
        }
        return 0;
    }

    function inFail(sensor : Sensor) {
        var result = false;

        sensor.sampling?.map((data : string[]) => {
            if(Number(data[0]) > 0.2){
                result = true;
            }
        })

        return result;
    }

    function inVariation(sensor: Sensor){
        var result = false;
        
        sensor.sampling?.map((data : string[]) => {
            if(Number(data[0]) != 0.0){
                result = true;
            }
        })

        return result;
    }

    return (
        <div className={styles.container}>
            <header>
                <img src="/images/logo.svg" alt="sensores"/>
                <span>Sensores</span>
            </header>
            <div className={styles.sensorsList}>
                {
                    sensorContext.sensors.sort(compare).map((sensor : Sensor) => {
                        return(
                            <div className={`${styles.device} ${inFail(sensor) ? styles.fail : (inVariation(sensor) ? styles.danger : '')}`} key={sensor.addr}>
                                <img src="/images/fumaca.jpg" alt="Sensor" />
                                <span>Endereço: {sensor.addr}</span>
                                <span>Sensor: {sensor.value}</span>
                                <button type="button" onClick={() => sensorContext.setCurrentSensor(sensor)}>
                                    Visualizar
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}