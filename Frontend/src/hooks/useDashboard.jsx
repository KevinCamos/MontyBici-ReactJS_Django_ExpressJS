import { compose } from "@mui/system";
import { useEffect, useState } from "react";
import bikeServices from "../services/BikeServices";

const useDashboard = () => {
    const [registers, setRegisters] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [countRegister, setCountRegister] = useState(0);
    const [longerJourney, setLongerJourney] = useState(false);
    const [lastJourney, setLastJourney] = useState(false);
    const [favStationGetter, setFavStationGetter] = useState(false);
    const [favStationReturn, setFavStationReturn] = useState(false);

    useEffect(
        async function () {
            setIsLoading(true);

            bikeServices.returnMyRegisters()
                .then((data) => {
                    var registers = data.data.results

                    setCountRegister(data.data.count)
                    if(data.data.count>0){
                    setRegisters(registers)

                    //Creando datos para la tabla
                    createTable(registers)
                    maxTimeJourney(registers)
                    lastJourneyFunction(registers)
                    favStation(registers)

                    }
                    setIsLoading(false);

                }).catch((error) => {
                    setIsError(true);

                    setIsLoading(false);
                });
        },
        [setRegisters, setIsLoading, setIsLoading]
    );
    // https://stackoverflow.com/questions/44829459/javascript-count-number-values-repeated-in-a-jsonarray-items
    const favStation = (registers) => {
        let favGet = mapToProp(registers, 'point_get')
        let favReturn = mapToProp(registers, 'point_return')
        let maxGetKey= maxKey(favGet)
        let maxReturnKey= maxKey(favReturn)
        setFavStationGetter({ "key":maxGetKey, "value": favGet[maxGetKey]})
        setFavStationReturn({ "key":maxReturnKey, "value": favReturn[maxReturnKey]})

    }

    const maxKey = (value) => {
        let maxValue = 0, maxKey = "";
        for (var key in value) {
            if (value[key] > maxValue) {
                maxValue=value[key]
                 maxKey = key
            }
        }
        return maxKey;

    }

    const mapToProp = (registers, prop) => {

        //Este if es para evitar si hay un registro abierto 
        if( !registers[registers.length-1][prop]){
            registers.pop()
        }
        return registers
            .reduce((res, item) => Object
                .assign(res, {
                    [item[prop].station.name]: 1 + (res[item[prop].station.name] || 0)
                }), Object.create(null))
            ;
    }
    const maxTimeJourney = (registers) => {
        let maxTime, data

        registers.map(function (register, index) {
            data = dataTimer(register, false)
            if (data.time && index === 0) {
                maxTime = data.time
            } else if (data.time && maxTime < data.time) {
                maxTime = data.time
            }
        })
        setLongerJourney(maxTime.toISOString().substring(19, 11))
    }
    const lastJourneyFunction = (registers) => {
        let data = dataTimer(registers[registers.length - 1])

        setLastJourney(data.date_getter.toLocaleDateString())
    }
    const dataTimer = (register, isTimeString = true) => {
        let date_getter = new Date(register.data_get)
        let date_return = register.point_return ? new Date(register.data_return) : "-";
        let time
        if (isTimeString) {
            time = register.point_return ? new Date(date_return - date_getter).toISOString().substring(19, 11) : "-"
        } else {
            time = register.point_return ? new Date(date_return - date_getter) : null;
        }
        return { date_getter, date_return, time }
    }



    const createTable = (registers) => {
        const makingRows = []
        registers.map((register) => { makingRows.push(createData(register)) });
        setRows(makingRows);
    }

    const createData = (register) => {
        let { date_getter, date_return, time } = dataTimer(register);

        let station_get = register.point_get.station.name;
        let data_get = date_getter.toLocaleString();
        let station_return = register.point_return ? register.point_return.station.name : "-";
        let data_return = register.point_return ? date_return.toLocaleString() : "-";
        return { station_get, data_get, station_return, data_return, time };
    }

    const handleChangePage = (event, newPage) => {
        if (event.target.value) {
            setRowsPerPage(event.target.value);
            setPage(0);
        } else {
            setPage(newPage);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return { registers, isLoading, isError, countRegister, longerJourney, lastJourney, favStationGetter, favStationReturn, rows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage };
}
export default useDashboard