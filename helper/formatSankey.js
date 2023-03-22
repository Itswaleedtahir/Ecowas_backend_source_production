// Formating data to support our Sankey in the frontend
const formatData = (data) => {
    const nodes = [];
    const links = [];

    data.forEach(row => {
        const { Input, Output, valeur, Image } = row;

        let sourceNode = nodes.find(node => node.id === Input);

        if(!sourceNode) {
            sourceNode = { id: Input, value: 0, image: Image }
            nodes.push(sourceNode);
        }

        let destNode = nodes.find(node => node.id === Output);
        if (!destNode) {
            destNode = { id: Output, value: 0, image: Image };
            nodes.push(destNode);
        }

        sourceNode.value += parseInt(valeur);

        links.push({ source: Input, target: Output, value: parseInt(valeur) });
    });

    return { nodes, links };
}

module.exports = {
    formatData
}