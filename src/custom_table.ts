import Table from "cli-table3";
export interface ICustomTable {
    title: string,
    drawTable: Function
}

export class CustomTable implements  ICustomTable {
    constructor(
        public title: string,
    ) {
    }

    drawTable() {
        // Create a new table instance
        const table = new Table({
            head: ['Name', 'Age', 'Country'],
            colWidths: [15, 10, 15], // Set the column widths
        });

// Sample data
        const data = [
            ['John', 30, 'USA'],
            ['Alice', 25, 'Canada'],
            ['Bob', 35, 'UK'],
        ];

// Add data to the table
        data.forEach((row) => {
            table.push(row);
        });

// Print the table
        console.log(table.toString());

    }
}