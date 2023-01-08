const test = async () => {
    const response = await fetch('http:/localhost:3000/mostrarFrasesCodificadas')
    const arrayFrases = await response.json()
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
                        <td>${frase}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
`
// Insertamos la tabla en el elemento
    tableContainer.innerHTML = tableHTML;
}

test()
