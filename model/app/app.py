from flask import Flask, request
from convert import convertIncidentsToWork
from model import MainModel
import json


app = Flask(__name__)

main_model = MainModel()


@app.route('/model_state', methods=['POST'])
def model():
    data = request.get_json()
    print(data)
    data = json.loads(data)
    unom_list = data['unom']
    included_source = data['source']
    includet_work_type = data['work_type']
    start_date =  data['start_date']
    end_date = data['end_date']

    res_dict = {}
    for unom in unom_list:
        incident_list = main_model.predict(unom)
        res_dict[unom] = convertIncidentsToWork(incident_list, included_source, includet_work_type)

    responce = json.dumps(res_dict)
    print(responce)
    return responce


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
