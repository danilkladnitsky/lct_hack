import pandas as pd
import sqlite3



def convertIncidentsToWork(incident_list, included_source = [], includet_work_type = []):
    conn = sqlite3.connect('LCT_Data')
    cursor = conn.cursor()
    result_list = []


    for incident in incident_list:
        query = f"SELECT DISTINCT source FROM incident_source WHERE name = '{incident}';"
        cursor.execute(query)
        results = cursor.fetchall()
        source = pd.DataFrame(results)[0].values[0]

        if source in included_source or len(included_source) == 0:
            query = f"SELECT DISTINCT work_name FROM work_incident WHERE incident_name = '{incident}';"
            cursor.execute(query)
            results = cursor.fetchall()
            works = pd.DataFrame(results)[0].values
            for work in works:
                if work in includet_work_type or len(includet_work_type) == 0:
                    result_list.append(work)

    return result_list