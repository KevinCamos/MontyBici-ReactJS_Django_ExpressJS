import React from "react";
import ListOfStations from "../../components/ListOfStations/ListOfStations";
import useStation from "../../hooks/useStation";

export default function StationPage() {
  const { stations, loading} = useStation();


  return (
    <>
      <ListOfStations stations={stations} loading={loading}/>
    </>
  );
}
