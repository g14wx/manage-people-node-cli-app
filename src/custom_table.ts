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

    drawTable(headers: string[], data: string[][]) {

        const table = new Table({
            head: headers
        });

        data.forEach((row) => {
            table.push(row);
        });

        console.log(table.toString());
    }
}