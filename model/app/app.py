from flask import Flask

from model.app.model import MainModel

app = Flask(__name__)

main_model = MainModel()


@app.route('/model_state', methods=['POST'])
def model():
    result = main_model.predict()
    return {"success": True, "result": result}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
