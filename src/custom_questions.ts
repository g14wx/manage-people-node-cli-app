import inquirer, {QuestionCollection} from "inquirer";
import {MenuIndex, MenuIndexListPeople} from "./domain/constants/menu_index.js";
import {faker} from "@faker-js/faker";
import {PersonStatus} from "./domain/models/constants/person_status.js";
import {IHelpers} from "./utils/helpers.js";
import {IPersonAnswers, Person} from "./domain/models/person.js";

export interface ICustomQuestions {
    WantToContinueInApp: boolean,
    SelectMenuIndex: MenuIndex,
    SelectedListPeopleMenuIndex?: MenuIndexListPeople,

    questionsToAddAnewPerson(): Promise<IPersonAnswers>,

    askExitApp: Function,
    askGoFromMainMenu: Function,

    askOrderByStatus(): Promise<boolean>,

    askAscDesc(): Promise<boolean>,

    askGoFromListPeopleSubMenu: Function,
    helpers: IHelpers,
    resetSelectedListPeopleMenuIndex: Function,
    resetSelectMenuIndex: Function,

    questionsToUpdateAUser(): Promise<IPersonAnswers>

    questionSelectPerson(people: Person[]): Promise<number>
}

export class CustomQuestions implements ICustomQuestions {
    private _questionExitApp: QuestionCollection[];
    private _questionMainMenu: QuestionCollection[];
    private _questionsToAddAnewPerson: QuestionCollection[];
    private _questionToListByStatus: QuestionCollection[];
    private _questionAscDesc: QuestionCollection[];
    private _questionListByPersonAttribute: QuestionCollection[];
    private _questionToUpdateAPerson: QuestionCollection[];

    private _selectMenuIndex: MenuIndex;
    private _wantToContinueInApp: boolean;
    private _selectedListPeopleMenuIndex: MenuIndexListPeople;

    constructor(
        public helpers: IHelpers
    ) {
        this._wantToContinueInApp = true;
        this._selectMenuIndex = MenuIndex.ListPeople;
        this._selectedListPeopleMenuIndex = null;
        this._setQuestions();

    }

    _setQuestions() {
        this._questionExitApp = [
            {
                name: "wantsContinueInApp",
                message: "Do you want to continue in the app?",
                type: "list",
                choices: ["Yes", "No"]
            }
        ];
        const getLiteralsMenuIndex: string[] = Object.values(MenuIndex);
        this._questionMainMenu = [
            {
                name: "mainMenuIndex",
                message: "Select what to do",
                type: "list",
                choices: [...getLiteralsMenuIndex]
            }
        ];
        this._questionsToAddAnewPerson = [
            {
                name: "Name",
                message: "Type person name",
                type: "input",
                default: faker.person.firstName()
            },
            {
                name: "FavoriteFood",
                message: "Type person favorite food",
                type: "input",
                default: faker.person.lastName()
            },
            {
                name: "FavoriteMovie",
                message: "Type person favorite movie",
                type: "input",
                default: faker.airline.airplane().name,
            },
        ];
        const getLiteralsPersonAttributes: string[] = Object.values(MenuIndexListPeople);
        this._questionListByPersonAttribute = [
            {
                name: "sortByPersonAttribute",
                message: "Select sort by attribute:",
                type: "list",
                choices: [...getLiteralsPersonAttributes]
            }
        ];

        const getLiteralsStatus: string[] = Object.values(PersonStatus);
        this._questionToListByStatus = [
            {
                name: "sortByPersonAttribute",
                message: "Select sort by status:",
                type: "list",
                choices: [...getLiteralsStatus]
            }
        ];
        this._questionExitApp = [
            {
                name: "wantsContinueInApp",
                message: "Do you really want to exit the app?",
                type: "list",
                choices: ["Yes", "No"]
            }
        ];

        this._questionAscDesc = [
            {
                name: "ascDesc",
                message: "Want to order by in:",
                type: "list",
                choices: ["Asc", "Desc"]
            }
        ];

        this._questionToUpdateAPerson = [
            {
                name: "Name",
                message: "Type person name (leave alone to not update it)",
                type: "input",
                default: "",
            },
            {
                name: "FavoriteFood",
                message: "Type person favorite food (leave alone to not update it)",
                type: "input",
                default: "",
            },
            {
                name: "FavoriteMovie",
                message: "Type person favorite movie (leave alone to not update it)",
                type: "input",
                default: "",
            },
            {
                name: "Status",
                message: "Select status (select none, to not update it)",
                type: "list",
                choices: [...getLiteralsStatus, "none"]
            },
        ];
    }

    public async askExitApp(): Promise<void> {
        const result: IQuestionExitApp = await inquirer.prompt(this._questionExitApp);
        this._wantToContinueInApp = result.wantsContinueInApp === 'No';
    }

    public async askGoFromMainMenu(): Promise<void> {
        const result: IQuestionMainMenuIndex = await inquirer.prompt(this._questionMainMenu);
        const selectedIndexEnum = this.helpers.getEnumKeyByValue(MenuIndex, result.mainMenuIndex);
        if (selectedIndexEnum !== undefined) {
            this._selectMenuIndex = MenuIndex[selectedIndexEnum];
        }
    }

    public async askOrderByStatus(): Promise<boolean> {
        const result: IQuestionSortByStatus = await inquirer.prompt(this._questionToListByStatus);
        return result.sortByStatus === PersonStatus.Active;
    }

    public async askGoFromListPeopleSubMenu(): Promise<void> {
        const result: IQuestionSortByPersonAttribute = await inquirer.prompt(this._questionListByPersonAttribute);
        const selectedIndexEnum = this.helpers.getEnumKeyByValue(MenuIndexListPeople, result.sortByPersonAttribute);
        if (selectedIndexEnum !== undefined) {
            this._selectedListPeopleMenuIndex = MenuIndexListPeople[selectedIndexEnum];
        }
    }

    public async askAscDesc(): Promise<boolean> {
        const result: IQuestionSortByAscDesc = await inquirer.prompt(this._questionAscDesc);
        return result.ascDesc === 'Asc';
    }

    public async questionsToAddAnewPerson(): Promise<IPersonAnswers> {
        return inquirer.prompt(this._questionsToAddAnewPerson);
    }

    public get WantToContinueInApp(): boolean {
        return this._wantToContinueInApp;
    }

    public get SelectMenuIndex(): MenuIndex {
        return this._selectMenuIndex;
    }

    public get SelectedListPeopleMenuIndex(): MenuIndexListPeople {
        return this._selectedListPeopleMenuIndex;
    }

    public resetSelectedListPeopleMenuIndex(): void {
        this._selectedListPeopleMenuIndex = null;
    }

    public resetSelectMenuIndex(): void {
        this._selectMenuIndex = null;
    }

    public async questionsToUpdateAUser(): Promise<IPersonAnswers> {
        return inquirer.prompt(this._questionToUpdateAPerson);
    }

    public async questionSelectPerson(people: Person[]): Promise<number> {
        const result: IQuestionGetIndexPersonToUpdate = await inquirer.prompt([
            {
                name: "selectedIndexPerson",
                message: "Select a person to update",
                type: "list",
                choices: [...people.map((person: Person, index: number) => ({
                    "name":
                    person.Name, "value": index
                }))]
            }
        ]);
        return parseInt(result.selectedIndexPerson);
    }

}


interface IQuestionExitApp {
    wantsContinueInApp: string
}

interface IQuestionMainMenuIndex {
    mainMenuIndex: string
}

interface IQuestionSortByStatus {
    sortByStatus: string
}

interface IQuestionSortByAscDesc {
    ascDesc: string
}

interface IQuestionSortByPersonAttribute {
    sortByPersonAttribute: string
}

interface IQuestionGetIndexPersonToUpdate {
    selectedIndexPerson: string
}