import json

from flask import Flask, request

from prediction_model.app.model import MainModel

app = Flask(__name__)

main_model = MainModel()


@app.route('/model_state', methods=['POST'])
def model():
    content_raw = request.get_json()
    content = json.loads(content_raw)
    unom_list = content['unom']
    included_source = content['source']
    includet_work_type = content['work_type']
    start_date = content['start_date']
    end_date = content['end_date']
    status = True
    result = main_model.predict(included_source, included_source, includet_work_type)
    result_dict = {k: v for k, v in zip(content["unoms"], result)}
    return {"success": status, "result": result_dict}





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
