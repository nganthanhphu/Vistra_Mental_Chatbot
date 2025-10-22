from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=['POST'])
def predict_route():
    message = request.get_json()
    return jsonify(predict(message))

if __name__ == '__main__':
    with app.app_context():
        app.run(debug=False)