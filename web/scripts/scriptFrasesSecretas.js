const tablaBotones = async () => {
    const response = await fetch('http:/localhost:3000/mostrarFrasesSecretas')
    const arrayFrases = await response.json()
    console.log(arrayFrases)
    const tableContainer =  document.getElementById("table-container")
    const tableHTML =  `
    <table>
        <thead>
            <tr>
                <th>Frase</th>
            </tr>
            </thead>
            <tbody>
                ${arrayFrases.map(frase => {
                    return `
                    <tr>
                        <td><a href="fraseNormal.html"><button onClick = "sendData('${frase}')">${frase}</button></td></a>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
`
// Insertamos la tabla en el elemento
    tableContainer.innerHTML = tableHTML;

}

tablaBotones()

const sendData = (frase) => {
    fetch('http:/localhost:3000/selFraseSecreta', {
        method: "POST",
        body: JSON.stringify({frase: frase})
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
