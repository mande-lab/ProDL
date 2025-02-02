function runCode() {
    const code = document.getElementById("code-input").value;
    try {
        let tokens = tokenizer(code);
        let ast = parser(tokens);
        interpreter(ast);
    } catch (e) {
        document.getElementById("output").innerText = `Error: ${e.message}`;
    }
}
