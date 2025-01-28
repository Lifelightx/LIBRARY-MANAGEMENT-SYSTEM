from flask import Flask, request, jsonify, redirect, render_template


app = Flask(__name__)


@app.route("/")
def home():
    return "Hello world."


if __name__ == "__main__":
    app.run(debug=True)

