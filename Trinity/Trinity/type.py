# type.py
def check_types(ast):
    errors = []
    env = {}

    for statement in ast:
        if statement['type'] == 'Assignment':
            var = statement['variable']
            value = check_expression_type(statement['value'], env)
            if value is not None:
                env[var] = value
            else:
                errors.append(f"Type error in assignment to {var}")

        elif statement['type'] == 'Expression':
            check_expression_type(statement['expression'], env)

    return errors


def check_expression_type(expr, env):
    if expr['type'] == 'Literal':
        return 'int'
    elif expr['type'] == 'Identifier':
        if expr['name'] in env:
            return env[expr['name']]
        else:
            return None
    elif expr['type'] == 'BinaryExpression':
        left_type = check_expression_type(expr['left'], env)
        right_type = check_expression_type(expr['right'], env)
        
        if left_type == 'int' and right_type == 'int':
            return 'int'
        else:
            return None
