from flask import Flask, request

from prediction_model.app.model import MainModel

app = Flask(__name__)

main_model = MainModel()


@app.route('/model_state_works', methods=['POST'])
def model_works():
    content = request.get_json()
    unom_list = content['unom']
    included_source = content['source']
    included_work_type = content['work_type']
    start_date = content['start_date']
    end_date = content['end_date']
    status = True
    result = main_model.predict_works(unom_list, included_source, included_work_type)
    result_dict = {k: v for k, v in zip(unom_list, result)}
    return {"unom": result_dict}


@app.route('/model_state_incedents', methods=['POST'])
def model_incedents():
    content = request.get_json()
    unom_list = content['unom']
    included_source = content['source']
    includet_work_type = content['work_type']
    start_date = content['start_date']
    end_date = content['end_date']
    status = True
    result = main_model.predict_incedents(unom_list)
    result_dict = {k: v for k, v in zip(unom_list, result)}
    return {"result": result_dict}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
