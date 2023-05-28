import random
from typing import List

from convert import convert_incidents_to_work
from database import DataBase


class MainModel:
    def __init__(self):
        self.database = DataBase()

    def get_default(self, cursor):
        inc = cursor.execute("select name from incident_source;")
        i_k = [x for x in inc]
        return random.sample(i_k, 5)

    def get_prediction_for_unom(self, cursor, unum: int):
        incidents = self.database.get_incedents_for_building(cursor, unum)
        if len(incidents) == 0:
            incidents = self.get_default(cursor)
        incidents_sample = random.sample(incidents, min(len(incidents), 5))
        return {"incidents": incidents_sample}

    def predict_works(self, unoms: List[int], included_source, includet_work_type):
        results = []
        cursor = self.database.get_cursor()
        for unum in unoms:
            prediction_list_dict = self.get_prediction_for_unom(cursor, unum)
            prediction = [x[0] for x in prediction_list_dict["incidents"]]
            converted2work = convert_incidents_to_work(cursor, prediction, included_source, includet_work_type)
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
