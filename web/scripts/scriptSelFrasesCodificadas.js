const fraseCodificada = async () => {
    const response = await fetch('http:/localhost:3000/mostrarFrasesCodificadas')
    const arrayFrases = await response.json()
    const tableContainer =  document.getElementById("table-container")
    const tableHTML =  `
    <table>
        <thead>
            <tr>
                <th>Seleccionar Frase a Decodificar</th>
            </tr>
            </thead>
            <tbody>
                ${arrayFrases.map(frase => {
                    return `
                    <tr>
                        <td><a href="selFrasesSecretas.html"><button onClick = "sendData('${frase}')">${frase.split(',')[1]}</button></td></a>
                    </tr>
                    `;
                }).join('')}
            </tbody>
    </table>
`
// Insertamos la tabla en el elemento
    tableContainer.innerHTML = tableHTML;
}

fraseCodificada()

const sendData = (frase) => {
    fetch('http:/localhost:3000/guardarFrase', {
        method: "POST",
        body: JSON.stringify({frase: frase})
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}