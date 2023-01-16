const fraseCodificada = async () => {
    const response = await fetch('http:/localhost:3000/mostrarFrasesCodificadas')
    const arrayFrases = await response.json()
    const tableContainer =  document.getElementById("table-container")
    const tableHTML =  `
    <table>
        <thead>
            <tr>
                <th>Frases Codificadas</th>
            </tr>
            </thead>
            <tbody>
                ${arrayFrases.map(frase => {
                    return `
                    <tr>
                        <td>${frase.split(',')[1]}</td>
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
