from typing import List
import pandas as pd
import sqlite3

from prediction_model.app.convert import convertIncidentsToWork
from prediction_model.app.database import DataBase


class MainModel:
    def __init__(self):
        self.database = DataBase()

    def get_prediction_for_unom(self, unum: int):
        incedents = self.database.get_incedents_for_building(unum)
        return {"incedents": incedents}

    def predict(self, unoms: List[int], included_source, includet_work_type):
        return [convertIncidentsToWork(self.get_prediction_for_unom(x), included_source, includet_work_type) for x in
                unoms]

    def predict_old(self, unom):
        conn = sqlite3.connect('LCT_Data')
        cursor = conn.cursor()
        query = f"SELECT DISTINCT name FROM incidents WHERE unom = {unom} LIMIT 2;"
        cursor.execute(query)
        results = cursor.fetchall()
        incidents = pd.DataFrame(results)[0].values

        return incidents
