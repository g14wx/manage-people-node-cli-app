import {IPersonAnswers, Person} from "./models/person.js";
import {PersonStatus} from "./models/constants/person_status.js";
import {IHelpers} from "../utils/helpers.js";

export interface IPeopleController {
    People: Person[],
    addPerson: Function,
    getDataToDisplayOnTable(people?: Person[]): string[][],
    helpers: IHelpers
    sortPeopleBy(active: boolean, attribute: string): string[][],
    listOnlyActiveOnes(): string[][],
    getPeople(): Person[],
    updatePerson(index: number, updateValues: IPersonAnswers)
}

export class PeopleController implements IPeopleController {
    private _people: Person[];

    constructor(
        public helpers: IHelpers
    ) {

        let rockyObj = {
            'Name': 'Rocky',
            'Favorite Food': 'Sushi',
            'Favorite Movie': 'Back to The Future',
            'Status': 'Inactive'
        }
        let miroslavObj = {
            'Name': 'Miroslav',
            'Favorite Food': 'Sushi',
            'Favorite Movie': 'American Psycho',
            'Status': 'Active'
        }
        let donnyObj = {
            'Name': 'Donny',
            'Favorite Food': 'Singapore chow mei fun',
            'Favorite Movie': 'The Princess Bride',
            'Status': 'Inactive'
        }
        let mattObj = {
            'Name': 'Matt',
            'Favorite Food': 'Brisket Tacos',
            'Favorite Movie': 'The Princess Bride',
            'Status': 'Active'
        }


        let listOfPeopleRaw = [
            rockyObj,
            miroslavObj,
            donnyObj,
            mattObj
        ];
        const listPeople = listOfPeopleRaw.map((rawPerson: { [x: string]: any; Status: string | number; }) => {
            let currentDate = this.helpers.getCurrentDateTime();
            let person = new Person(currentDate ,rawPerson["Name"] || null, rawPerson["Favorite Food"] || null, rawPerson["Favorite Movie"] || null, rawPerson.Status ? PersonStatus[rawPerson.Status] : null);
            person.UpdatedAt = currentDate;
            return person;
        });
        this._people = [...listPeople];
    }

    public get People(): Person[] {
        return this._people;
    }

    public set People(people: Person[]) {
        this._people = people;
    }

    public addPerson(person: IPersonAnswers) {
        let currentDate = this.helpers.getCurrentDateTime();
        const newPerson: Person = new Person(currentDate, person.Name, person.FavoriteFood, person.FavoriteMovie);
        newPerson.UpdatedAt = currentDate;
        this._people.push(newPerson);
    }

    getDataToDisplayOnTable(people?: Person[]): string[][] {
        const rightPeople = people ?? this._people;
        return rightPeople.map((person: Person) => {
            return [person.Name, person.FavoriteFood, person.FavoriteMovie, person.Status, person.CreatedAt, person.UpdatedAt];
        });
    }

    sortPeopleBy(active: boolean, attribute: string): string[][] {
        const peopleSortByStatus = this._people.sort((a, b) => (active ? a[attribute].localeCompare(b[attribute]) : b[attribute].localeCompare(a[attribute])));
        return this.getDataToDisplayOnTable(peopleSortByStatus);
    }

    listOnlyActiveOnes() {
        const onlyActivePeople: Person[] = this._people.filter((person) => person.Status == PersonStatus.Active);
        return this.getDataToDisplayOnTable(onlyActivePeople);
    }

    getPeople(): Person[] {
        return this._people;
    }

    updatePerson(index: number, updateValues: IPersonAnswers) {
        let person: Person = this._people[index];
        if (updateValues.Name.length !== 0 || updateValues.FavoriteFood.length !== 0 || updateValues.FavoriteMovie.length !== 0 || (updateValues.Status !== null && updateValues.Status !== "none") ){
            let currentDate = this.helpers.getCurrentDateTime();
            let name: string = updateValues.Name.length > 0 ? updateValues.Name : person.Name;
            let favoriteFood: string = updateValues.FavoriteFood.length > 0 ? updateValues.FavoriteFood : person.FavoriteFood;
            let favoriteMovie: string = updateValues.FavoriteMovie.length > 0 ? updateValues.FavoriteMovie : person.FavoriteMovie;
            let status: PersonStatus = (updateValues.Status !== null && updateValues.Status !== "none") ? PersonStatus[updateValues.Status] : person.Status;
            // update the person
            let personToUpdate = new Person( person.CreatedAt, name, favoriteFood, favoriteMovie, status);
            personToUpdate.UpdatedAt = currentDate;
            this._people[index] = personToUpdate;
            // update date of updating

        }
    }
}