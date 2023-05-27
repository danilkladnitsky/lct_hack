import React from "react";
import { Analyze } from "tabler-icons-react";
import ActionButton from "ui/shared/ActionButton/ActionButton";

import styles from "./OpenAnalyzeForm.module.scss";

type Props = {
    onClick: () => void;
}

const OpenAnalyzeForm = ({ onClick }: Props) => {
  return (
    <div className={styles.btnWrapper}>
      <ActionButton
        className={styles.analyzeBtn}
        onClick={onClick}
        leftIcon={<Analyze />}
      >
        Создать прогноз
      </ActionButton>
    </div>
  );
};

export default OpenAnalyzeForm;
