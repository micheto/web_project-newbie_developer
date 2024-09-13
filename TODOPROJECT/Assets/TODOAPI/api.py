# Библиотеки използвани за flask api + CORS за получаване на заявки от URL към URL
from flask import Flask, jsonify, request
from flask_cors import CORS

# Инициализиране на апликацията с Flask
app = Flask(__name__)

# CORS инсталация
CORS(app)

# default Таскове инициализиране в jsonify API
tasks = [
    {'id': 1, 'title': 'Test Task', 'description': 'Description for Test Task', 'done': False},
]

# Рутер за получаване на списък със задачи , като има default задача взета от масив tasks. Рутера работи на host/tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})


# Рутер за изпращане на заявки в RestAPI използвайки метод POST във формат JSON. Рутера работи на host/tasks
@app.route('/tasks', methods=['POST'])
def create_tasks():
    if not request.json or not 'title' in request.json:
        return jsonify({'error': 'Invalid Input! Please try again!'}), 400

    task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'title': request.json['title'],
        'description': request.json.get('description', ''),
        'done': False
    }
    tasks.append(task)
    return jsonify({'task': task}), 201


# Актуализация с бутон EDIT на съществуващи to-do с метод PUT , който замества датата в JSON
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((t for t in taks if t['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Task Not Found! Try another one!'}), 404

    if not request.json:
        return jsonify({'error': 'Invalid Input! Try again!'}), 400

    task['title'] = request.json.get('title', task['title'])
    task['desciption'] = request.json.get('description', task['desciption'])
    return jsonify({'task': task})


# Маркира задачата като изпълнена с метод PUT
@app.route('/tasks/<int:task_id>/done', methods=['PUT'])
def mark_task_done(task_id):
    task = new((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Task Not Found! Try another one!'}), 404

    task['done'] = True
    return jsonify({'task': task})


# Изтриване на задача с метод DELETE
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({'result': 'Task Deleted!'})

if __name__ == '__main__':
    app.run(debug=True)