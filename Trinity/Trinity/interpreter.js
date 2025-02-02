class SimpleLangInterpreter {
    constructor() {
        this.variables = {};
    }

    declareVariable(name, value) {
        if (/\d+\s*[\+\-\*\/]\s*\d+/.test(value)) {
            this.variables[name] = this.evaluateExpression(value);
        } else {
            this.variables[name] = parseInt(value, 10);
        }
    }

    evaluateExpression(expression) {
        for (const varName in this.variables) {
            expression = expression.replace(new RegExp(`\\b${varName}\\b`, 'g'), this.variables[varName]);
        }
        try {
            return eval(expression);
        } catch (e) {
            throw new Error(`Error evaluating expression: ${expression}. Error: ${e}`);
        }
    }

    execute(code) {
        const lines = code.split('\n');
        let output = [];
        let i = 0;
        while (i < lines.length) {
            let line = lines[i].trim();
            i++;
            if (!line) continue;

            if (line.startsWith('declare')) {
                const [, name, ...valueParts] = line.split(/\s+/);
                const value = valueParts.join(' ');
                this.declareVariable(name, value);
            } else if (line.startsWith('print')) {
                const [, ...printParts] = line.split(/\s+/);
                const printExpression = printParts.join(' ');
                let result;
                if (printExpression.includes(':')) {
                    const [left, right] = printExpression.split(':').map(s => s.trim());
                    const leftValue = this.variables[left] || left;
                    const rightValue = this.variables[right] || right;
                    result = `${leftValue}${rightValue}`;
                } else if (printExpression.includes(' ')) {
                    const parts = printExpression.split(' ').map(s => s.trim());
                    const values = parts.map(part => this.variables[part] || part);
                    result = values.join(' ');
                } else if (/[\+\-\*\/]/.test(printExpression)) {
                    result = this.evaluateExpression(printExpression);
                } else {
                    if (this.variables.hasOwnProperty(printExpression)) {
                        result = this.variables[printExpression];
                    } else {
                        throw new Error(`Variable '${printExpression}' not declared.`);
                    }
                }
                output.push(result.toString());
            } else if (line.startsWith('input')) {
                const [, name] = line.split(/\s+/);
                const value = prompt(`Enter value for ${name}:`);
                this.declareVariable(name, value);
            } else if (line.includes('=')) {
                const [name, expression] = line.split('=').map(s => s.trim());
                const value = this.evaluateExpression(expression);
                this.declareVariable(name, value);
            } else if (line.startsWith('if ')) {
                const conditionStart = line.indexOf('(');
                const conditionEnd = line.lastIndexOf(')');
                if (conditionStart === -1 || conditionEnd === -1) throw new Error('Invalid if syntax');
                const condition = line.slice(conditionStart + 1, conditionEnd);
                const conditionMet = this.evaluateExpression(condition) ? true : false;

                let level = 1;
                let endIfIndex = i;
                for (; endIfIndex < lines.length; endIfIndex++) {
                    const currentLine = lines[endIfIndex].trim();
                    if (currentLine.startsWith('if ')) level++;
                    else if (currentLine.startsWith('end if')) {
                        level--;
                        if (level === 0) break;
                    }
                }
                if (endIfIndex >= lines.length) throw new Error('Missing end if');

                let elseIfs = [];
                let elseIndex = -1;
                for (let j = i; j < endIfIndex; j++) {
                    const currentLine = lines[j].trim();
                    if (currentLine.startsWith('else if ')) {
                        const condStart = currentLine.indexOf('(');
                        const condEnd = currentLine.lastIndexOf(')');
                        if (condStart === -1 || condEnd === -1) throw new Error('Invalid else if syntax');
                        const cond = currentLine.slice(condStart + 1, condEnd);
                        elseIfs.push({ index: j, condition: cond });
                    } else if (currentLine === 'else') {
                        elseIndex = j;
                        break;
                    }
                }

                if (conditionMet) {
                    const end = elseIfs.length ? elseIfs[0].index : elseIndex !== -1 ? elseIndex : endIfIndex;
                    output.push(...this.execute(lines.slice(i, end).join('\n')).split('\n'));
                    i = endIfIndex;
                } else {
                    let executed = false;
                    for (const elseif of elseIfs) {
                        const condValue = this.evaluateExpression(elseif.condition);
                        if (condValue) {
                            const next = elseIfs[elseIfs.indexOf(elseif) + 1];
                            const end = next ? next.index : elseIndex !== -1 ? elseIndex : endIfIndex;
                            output.push(...this.execute(lines.slice(elseif.index + 1, end).join('\n')).split('\n'));
                            executed = true;
                            i = endIfIndex;
                            break;
                        }
                    }
                    if (!executed && elseIndex !== -1) {
                        output.push(...this.execute(lines.slice(elseIndex + 1, endIfIndex).join('\n')).split('\n'));
                        i = endIfIndex;
                    } else {
                        i = endIfIndex;
                    }
                }
            } else if (line.startsWith('else if ') || line.startsWith('else') || line.startsWith('end if')) {
                throw new Error(`Unexpected control statement: ${line}`);
            } else {
                throw new Error(`Unknown command: ${line}`);
            }
        }
        return output.join('\n');
    }
}

// DOM Interaction
document.getElementById('run').addEventListener('click', () => {
    const code = document.getElementById('code').value;
    const outputDiv = document.getElementById('output');
    const interpreter = new SimpleLangInterpreter();

    try {
        const result = interpreter.execute(code);
        outputDiv.textContent = result;
    } catch (e) {
        outputDiv.textContent = `Error: ${e.message}`;
    }
});