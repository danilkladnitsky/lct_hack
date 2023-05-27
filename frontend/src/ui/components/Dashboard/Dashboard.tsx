import React from "react";

import Map from "../Map/Map";
import MapFooter from "../MapFooter/MapFooter";
import MapLayers from "../MapLayers/MapLayers";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Map />
      <MapLayers />
      <MapFooter />

    </div>
  );
};

export default Dashboard;
