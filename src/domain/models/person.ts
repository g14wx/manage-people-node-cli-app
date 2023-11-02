import {PersonStatus} from "./constants/person_status.js";

export interface IPerson {
    Name: string,
    FavoriteFood: string,
    FavoriteMovie: string,
    Status: PersonStatus,
    getStatusValue: Function,
    UpdatedAt: string,
    CreatedAt: string,
}

export interface IPersonAnswers {
    Name: string,
    FavoriteFood: string,
    FavoriteMovie: string,
    Status?: string
}

export class Person implements  IPerson {

    private _name: string;
    private _favoriteFood: string;
    private _favoriteMovie: string;
    private _status: PersonStatus;
    private _updated_at: string;
    private _created_at: string;

    constructor(createdAt: string, name?: string, favoriteFood?: string, favoriteMovie?: string,status?: PersonStatus) {
        this._name = name || "";
        this._favoriteFood = favoriteFood || "";
        this._favoriteMovie = favoriteMovie || "";
        this._status = status || PersonStatus.Active;
        this._created_at = createdAt;
    }

    public get Name(): string {
        return this._name;
    }

    public get FavoriteFood(): string {
        return this._favoriteFood;
    }
    public get FavoriteMovie(): string {
        return this._favoriteMovie;
    }

    public get Status(): PersonStatus {
        return this._status;
    }

    public getStatusValue() : string {
        return this._status.toString();
    }

    public get CreatedAt(): string {
        return this._created_at;
    }

    public get UpdatedAt(): string {
        return this._updated_at;
    }

    public set Name(name: string) {
        this._name = name;
    }

    public set FavoriteFood(favoriteFood: string) {
        this._favoriteFood = favoriteFood;
    }

    public set FavoriteMovie(favoriteMovie: string) {
        this._favoriteMovie = favoriteMovie;
    }

    public set UpdatedAt(updatedAt: string) {
        this._updated_at = updatedAt;
    }


}

export enum PersonAttributes {
    Name = "Name",
    FavoriteFood = "FavoriteFood",
    FavoriteMovie = "FavoriteMovie",
    Status = "Status",
    Exit = "Exit"
}