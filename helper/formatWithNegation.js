// Formating data to support our Sankey in the frontend

const formatWithNegation = (data) => {
    // Categorizing data year-wise as { year: data }
    const dataByYear = data.reduce((acc, cur) => {
        if (acc[cur.annee]) {
          acc[cur.annee].push(cur);
        } else {
          acc[cur.annee] = [cur];
        }
        return acc;
    }, {});

    // Formating each year's data into sankey format
    const allSankeyData = {};
    for (const year in dataByYear) {
        const sankeyData = generateSankeyData(dataByYear[year]);
        allSankeyData[year] = sankeyData;
    }

    return allSankeyData;
}


// Converts the tabulized JSON data into sankey format
const generateSankeyData = (data) => {
    // Defining arrays needed for d3-sankey
    const nodes = [];
    const links = [];

    // Adding nodes (id, image) into array uniquely
    data.forEach(record => {
        if (!nodes.some((node) => node.id === record.Output)) {
            nodes.push({ id: record.Output, image: record.Image })
        } else if (record.Image !== "") {
            nodes[nodes.findIndex(obj => obj.id === record.Output)].image = record.Image;
        }

        if (!nodes.some((node) => node.id === record.Input)) {
            nodes.push({ id: record.Input, image: record.Image })
        }
    });

    // Adding links (source, target, value, color) into array
    data.forEach(record => {
        let value = parseInt(record.valeur);
        if (value < 0) {
            // Flip the source and target when the value is negative
            const temp = record.Input;
            record.Input = record.Output;
            record.Output = temp;
            // Make the value positive
            value = Math.abs(value);
        }

        links.push({
            source: nodes.findIndex(obj => obj.id === record.Input),
            target: nodes.findIndex(obj => obj.id === record.Output),
            value: value,
            color: record.Color
        })
    })

    // Return needed sankey data
    return { nodes, links };
}


module.exports = {
    formatWithNegation
}