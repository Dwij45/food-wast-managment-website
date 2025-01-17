
from flask import Flask, request, jsonify
from flask_cors import CORS
from food import genaichat

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    response = genaichat(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)