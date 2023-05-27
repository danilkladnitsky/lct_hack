import React from "react";
import { Analyze } from "tabler-icons-react";
import ActionButton from "ui/shared/ActionButton/ActionButton";

import useCombinedStore from "store";

import styles from "./OpenAnalyzeForm.module.scss";

const OpenAnalyzeForm = () => {
  const { setAnalyzeFrameVisibility } = useCombinedStore();

  const openForm = () => {
    setAnalyzeFrameVisibility(true);
  };

  return (
    <div className={styles.btnWrapper}>
      <ActionButton
        className={styles.analyzeBtn}
        onClick={openForm}
        leftIcon={<Analyze />}
      >
        Создать прогноз
      </ActionButton>
    </div>
  );
};

export default OpenAnalyzeForm;
