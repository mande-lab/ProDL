function tokenizer(input) {
    let tokens = [];
    let current = 0;

    const WHITESPACE = /\s/;
    const NUMBERS = /\d/;
    const LETTERS = /[a-z_]/i;
    const OPERATORS = /[\+\-\*\/]/;
    const KEYWORDS = ['let', 'if', 'else', 'while', 'print'];

    while (current < input.length) {
        let char = input[current];

        // Skip whitespace
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        // Numbers
        if (NUMBERS.test(char)) {
            let value = '';
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'NUMBER', value });
            continue;
        }

        // Identifiers and keywords
        if (LETTERS.test(char)) {
            let value = '';
            while (LETTERS.test(char) || NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            if (KEYWORDS.includes(value)) {
                tokens.push({ type: 'KEYWORD', value });
            } else {
                tokens.push({ type: 'IDENTIFIER', value });
            }
            continue;
        }

        // Operators
        if (OPERATORS.test(char)) {
            tokens.push({ type: 'OPERATOR', value: char });
            current++;
            continue;
        }

        // Parentheses and braces
        if (char === '(' || char === ')' || char === '{' || char === '}') {
            tokens.push({ type: 'PAREN', value: char });
            current++;
            continue;
        }

        // Commas
        if (char === ',') {
            tokens.push({ type: 'COMMA', value: char });
            current++;
            continue;
        }

        // Semicolons
        if (char === ';') {
            tokens.push({ type: 'SEMICOLON', value: char });
            current++;
            continue;
        }

        // Unknown character
        throw new TypeError(`Unknown character: ${char}`);
    }

    return tokens;
}

function parser(tokens) {
    let current = 0;

    function walk() {
        let token = tokens[current];

        // Handle keywords and statements
        if (token.type === 'KEYWORD') {
            if (token.value === 'let') {
                current++;
                let name = tokens[current].value;
                current++;
                let value = walk();
                return { type: 'VariableDeclaration', name, value };
            }

            if (token.value === 'print') {
                current++;
                let value = walk();
                return { type: 'PrintStatement', value };
            }

            if (token.value === 'if') {
                current++;
                let condition = walk();
                let body = walk();
                return { type: 'IfStatement', condition, body };
            }

            if (token.value === 'while') {
                current++;
                let condition = walk();
                let body = walk();
                return { type: 'WhileStatement', condition, body };
            }
        }

        // Handle identifiers and numbers
        if (token.type === 'IDENTIFIER') {
            current++;
            return { type: 'Identifier', name: token.value };
        }

        if (token.type === 'NUMBER') {
            current++;
            return { type: 'NumberLiteral', value: parseInt(token.value) };
        }

        // Handle operators (binary expressions)
        if (token.type === 'OPERATOR') {
            current++;
            let left = walk();
            let right = walk();
            return { type: 'BinaryExpression', operator: token.value, left, right };
        }

        // Handle parentheses (for grouping)
        if (token.type === 'PAREN' && token.value === '(') {
            current++;
            let expr = walk();
            if (tokens[current].value === ')') {
                current++;
                return expr;
            }
        }

        throw new SyntaxError(`Unexpected token: ${token.type}`);
    }

    let ast = { type: 'Program', body: [] };
    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}
