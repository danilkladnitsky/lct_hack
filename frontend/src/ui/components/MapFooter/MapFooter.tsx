import React from "react";
import { Group, } from "@mantine/core";

import OpenAnalyzeForm from "../OpenAnalyzeForm/OpenAnalyzeForm";

import styles from "./MapFooter.module.scss";

const MapFooter = () => {
  return (
    <>
      <Group className={styles.mapFooter}>
        <OpenAnalyzeForm />
      </Group>
    </>
  );
};

export default MapFooter;
