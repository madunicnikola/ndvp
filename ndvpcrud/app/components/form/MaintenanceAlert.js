import useAppState from "./maintenance/maintenance.js";

const MaintenanceAlert = () => {
  const { maintenanceMessage, clearMaintenanceAlert } = useAppState();

  return (
    <div style={{ background: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
      <p>{maintenanceMessage}</p>
      <button onClick={clearMaintenanceAlert}>Close</button>
    </div>
  );
};

export default MaintenanceAlert;