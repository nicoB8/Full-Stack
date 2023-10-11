from flask import Flask, jsonify, request
from issue_operations import is_issue_in_list, create, read, update, delete

app = Flask(__name__)

@app.route("/createIssue", methods=['POST'])
def createApi():
    data = request.get_json()
    print("New Create Requested:")
    print(data)

    id = data.get("id")
    title = data.get("title")
    description = data.get("description")

    if is_issue_in_list(id) is not None:
        return jsonify({"message": f"Issue {id} is already created"}), 409

    create(id, title, description)
    return jsonify({"message": f"Issue {id} correctly created"}), 201

@app.route("/readIssues", methods=['GET'])
def readApi():
    all_issues = read()
    issues_json = [{"id": issue.id, "title": issue.title, "description": issue.description} for issue in all_issues]

    return jsonify(issues_json)

@app.route("/updateIssue", methods=['PUT'])
def updateApi():
    data = request.get_json()
    print("New Update Requested:")
    print(data)

    id = data.get("id")

    issue_index = is_issue_in_list(id)
    if issue_index is None:
        return jsonify({"message": f"Issue {id} not found"}), 404


    update(issue_index, data.get("title", None), data.get("description", None))
    return jsonify({"message": f"Issue {id} correctly updated"}), 200

@app.route("/deleteIssue", methods=['DELETE'])
def deleteApi():
    data = request.get_json()
    print("New Delete Requested:")
    print(data)

    id = data.get("id")

    issue_index = is_issue_in_list(id)
    if issue_index is None:
        return jsonify({"message": f"Issue {id} not found"}), 404

    delete(issue_index)
    return jsonify({"message": f"Issue {id} correctly deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
