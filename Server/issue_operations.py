from Issue import Issue

all_issues = [
    Issue(1, "Create a Server", "Server that creates Jira Issues"),
    Issue(2, "Create a Cliente", "Use react to manage Jira Issues"),
    Issue(3, "Add unit tests", "Test your app"),
]

def is_issue_in_list(id):
    for i, issue in enumerate(all_issues):
        if issue.id == id:
            return i
    return None

def create(id, title, description):
    new_issue = Issue(id, title, description)
    print("New Issue Created:")
    print(new_issue.id)
    all_issues.append(new_issue)

def read():
    return all_issues

def update(issue_index, title, description):
    if title is not None:
        all_issues[issue_index].title = title
    
    if description is not None:
        all_issues[issue_index].description = description

def delete(issue_index):
    del all_issues[issue_index]