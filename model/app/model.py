import pandas as pd
import sqlite3

class MainModel:
    def __init__(self):
        self.data = []

    def predict(self, unom):
        conn = sqlite3.connect('LCT_Data')
        cursor = conn.cursor()
        query = f"SELECT DISTINCT name FROM incidents WHERE unom = {unom} LIMIT 2;"
        cursor.execute(query)
        results = cursor.fetchall()
        incidents = pd.DataFrame(results)[0].values

        return incidents