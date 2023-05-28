from typing import List

from prediction_model.app.convert import convertIncidentsToWork
from prediction_model.app.database import DataBase


class MainModel:
    def __init__(self):
        self.database = DataBase()

    def get_prediction_for_unom(self, cursor, unum: int):
        incedents = self.database.get_incedents_for_building(cursor, unum)
        return {"incedents": incedents}

    def predict_works(self, unoms: List[int], included_source, includet_work_type):
        results = []
        cursor = self.database.get_cursor()
        for unum in unoms:
            prediction = self.get_prediction_for_unom(cursor, unum)
            converted2work = convertIncidentsToWork(cursor, prediction, included_source, includet_work_type)
            results.append(converted2work)
        cursor.close()
        return results

    def predict_incedents(self, unoms: List[int]):
        results = []
        cursor = self.database.get_cursor()
        for unum in unoms:
            prediction = self.get_prediction_for_unom(cursor, unum)
            results.append(prediction)
        cursor.close()
        return results
