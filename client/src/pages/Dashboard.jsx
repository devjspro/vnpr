import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../features/vehicle/vehicleSlice.js";
import LogTable from "../components/LogTable";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { logs } = useSelector((s) => s.vehicle);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const filtered = logs.filter((log) =>
    log.plateNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Vehicle Logs</h2>

      <SearchBar setQuery={setQuery} />

      <LogTable logs={filtered} />
    </div>
  );
}