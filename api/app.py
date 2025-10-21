from flask import Flask, request, jsonify
from model import predict

app = Flask(__name__)

@app.route("/predict", methods=['POST'])
def predict_route():
    message = request.get_json()
    return jsonify(predict(message))

if __name__ == '__main__':
    with app.app_context():
        app.run(debug=False)