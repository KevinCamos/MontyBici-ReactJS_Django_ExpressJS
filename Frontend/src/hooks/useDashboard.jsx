import { useEffect, useState } from "react";
import bikeServices from "../services/BikeServices";

const useDashboard = () => {
    const [registers, setRegisters] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [countRegister, setcountRegister] = useState(0);


    useEffect(
        function () {
            setIsLoading(true);

            bikeServices.returnMyRegisters()
                .then((data) => {
                    console.log(data.data.results)

                    setcountRegister(data.data.count)
                    setRegisters(data.data.results)

                    //Creando datos para la tabla
                    const makingRows = []
                    data.data.results.map((register) => { makingRows.push(createData(register)) })
                    setRows(makingRows);

                    setIsLoading(false);
                }).catch((error) => {
                    setIsError(true);

                    setIsLoading(false);
                });
        },
        [setRegisters, setIsLoading, setIsLoading]
    );
    // const makingRows = useCallback((registers) => {
    //     registers.map((register) => { rows.push(createData(register)) })   
    //   },
    //     []
    //   );


    const handleChangePage = (event, newPage) => {
        console.log(event)
        console.log(newPage)
        if (event.target.value) {
            setRowsPerPage(event.target.value);
            setPage(0);

        }else{
            setPage(newPage);

        }

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function createData(register) {
        let station_get = register.point_get.station.name
        let data_get = register.data_get
        let station_return = register.point_return.station ? register.point_return.station.name : 'De camino a otra estación'
        let data_return = register.data_get

        return { station_get, data_get, station_return, data_return };
    }



    return { registers, isLoading, isError, countRegister, rows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage };

}
export default useDashboard