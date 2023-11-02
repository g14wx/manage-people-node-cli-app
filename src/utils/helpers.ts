import {MenuIndexListPeople} from "../domain/constants/menu_index.js";
import {PersonAttributes} from "../domain/models/person.js";
import {DateTime} from "luxon";

export interface IHelpers {
    getEnumKeyByValue<T>(enumType: T, enumValue: string): keyof T | undefined,
    getPersonAttributeByMenuListLiteral(menuListIndex: MenuIndexListPeople): PersonAttributes,
    getCurrentDateTime(): string
}
export class Helpers implements  IHelpers{
    public getEnumKeyByValue<T>(enumType: T, enumValue: string): keyof T | undefined {
        for (const key in enumType) {
            if (enumType[key] === enumValue) {
                return key as keyof T;
            }
        }
        return undefined;
    }

    public getPersonAttributeByMenuListLiteral(menuListIndex: MenuIndexListPeople): PersonAttributes{
        switch (menuListIndex) {
            case MenuIndexListPeople.ByName:
                return PersonAttributes.Name;
            case MenuIndexListPeople.ByFavoriteFood:
                return PersonAttributes.FavoriteFood;
            case MenuIndexListPeople.ByFavoriteMovie:
                return PersonAttributes.FavoriteMovie;
            case MenuIndexListPeople.ByStatus:
                return PersonAttributes.Status;
            case MenuIndexListPeople.Exit:
                return PersonAttributes.Exit;

        }
    }

    public getCurrentDateTime(): string{
        const now = DateTime.local();
        return now.toLocaleString(DateTime.DATETIME_FULL);
    }
}