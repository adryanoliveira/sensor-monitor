import { createContext } from "react";

export type Sensor = {
    sampling: [string[]];
    addr: number;
    type: number;
    value: number;
    start: number;
    fire: boolean;
    failure: boolean;
    adjust: boolean;
}

export type SensorContextProps = {
    sensors: Sensor[],
    currentSensor: Sensor;
    setCurrentSensor: (sensor : Sensor) => void;
}

export const SensorContext = createContext({} as SensorContextProps);
