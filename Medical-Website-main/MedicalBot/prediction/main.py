
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from flask import request
from flask import jsonify

@app.route('/', methods=["POST", "GET"])
def predict():
    from chat import get_response
    from chat import predict_class, intents
    text = request.get_json().get("message")
    ints=predict_class(text)
    response = get_response(ints, intents)
    message = {"answer": response}
    return jsonify(message)

if __name__ == '__main__':
    app.run(debug=True)