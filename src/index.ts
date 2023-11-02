#!/usr/bin/env node
import {CustomTable, ICustomTable} from "./custom_table.js";
import {CustomQuestions, ICustomQuestions} from "./custom_questions.js";
import {IPeopleController, PeopleController} from "./domain/people_controller.js";
import {MenuIndex, MenuIndexListPeople} from "./domain/constants/menu_index.js";
import {IPersonAnswers, PersonAttributes} from "./domain/models/person.js";
import {Helpers, IHelpers} from "./utils/helpers.js";

const table: ICustomTable = new CustomTable("People");
const helpers: IHelpers = new Helpers();
const questions: ICustomQuestions = new CustomQuestions(helpers);
const people: IPeopleController = new PeopleController(helpers);

// Titles
const _simpleTitle: Function = (title: String) => {
    console.clear();
    console.log("---------------------------");
    console.log(title);
    console.log("--------------------------");
};

await questions.askGoFromMainMenu();

while (questions.WantToContinueInApp) {
    while (questions.SelectMenuIndex != MenuIndex.Exit) {
        switch (questions.SelectMenuIndex) {
            case MenuIndex.AddPerson:
                const result: IPersonAnswers = await questions.questionsToAddAnewPerson();
                // Create new person
                people.addPerson(result);
                console.clear();
                break;
            case MenuIndex.ListPeople:
                let sortByTitle: string = "Name Ascendant";
                let attribute: PersonAttributes = PersonAttributes.Name;
                let sortedPeople: string[][] = [];
                let sortByAsc: boolean = true;
                // ask
                while (questions.SelectedListPeopleMenuIndex !== MenuIndexListPeople.Exit) {
                    if (questions.SelectedListPeopleMenuIndex !== null && questions.SelectedListPeopleMenuIndex !== MenuIndexListPeople.ListOnlyActive) {
                        sortByAsc = await questions.askAscDesc();
                    }
                    if(questions.SelectedListPeopleMenuIndex !== MenuIndexListPeople.ListOnlyActive) {
                        attribute = questions.SelectedListPeopleMenuIndex == null ? PersonAttributes.Name : helpers.getPersonAttributeByMenuListLiteral(questions.SelectedListPeopleMenuIndex);
                        sortByTitle = `${questions.SelectedListPeopleMenuIndex || MenuIndexListPeople.ByName} ${sortByAsc ? 'Ascendant' : 'Descendent'}`;
                        sortedPeople = people.sortPeopleBy(!sortByAsc, attribute);
                    } else {
                        sortByTitle = "(List only active ones)";
                        sortedPeople = people.listOnlyActiveOnes();
                    }

                    if (sortedPeople.length === 0){
                        if (questions.SelectedListPeopleMenuIndex === MenuIndexListPeople.ListOnlyActive){
                            _simpleTitle("There is no active users by the moment! 😔");
                        }
                    } else {
                        _simpleTitle(`List People ${sortByTitle}`);
                        table.drawTable(["Name", "Favorite Food", "Favorite movie", "Status", "Created at", "Updated at"], sortedPeople);
                    }

                    await questions.askGoFromListPeopleSubMenu();
                }
                questions.resetSelectedListPeopleMenuIndex();
                console.clear();
                break;

            case MenuIndex.ModifiedPerson:
                // fist list all the persons
                const listOfPeople = people.getPeople();
                const index: number = await questions.questionSelectPerson(listOfPeople);
                console.log("index to update the user:  ", index);
                const results: IPersonAnswers = await questions.questionsToUpdateAUser();
                // Create new person
                people.updatePerson(index, results);
                console.clear();
                break;


        }
        console.clear();
        await questions.askGoFromMainMenu();
    }
    // Reset menu loop
    questions.resetSelectMenuIndex();
    await questions.askExitApp();
}
process.exit(1);
