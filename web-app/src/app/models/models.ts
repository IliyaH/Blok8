export class Station{
    Id: number;
    Name: string;
    Address: string;
    XCoordinate: number;
    YCoordinate: number;
    Exist: boolean = false;
    Version: number;
}

export class Line{
    Id: number;
    LineName: string;
    LineType : string;
    Version: number;
}

export class Departure{
    Id: number;
    Departures: string;
    IdLine : number;
    IdDay : number;
    IdTimetableActive : number;
    Version: number;
}

export class User{
    Name: string;
    Surname: string;
    Address: string;
    Birthday: any;
    Email: string;
    UserType: string;
}

export class GeoLocation{
    constructor(public latitude: number, public longitude: number){

    }
}

export class Polyline{
    public path: GeoLocation[]
    public color: string
    public icon: any

    constructor(path: GeoLocation[], color: string, icon: any){
        this.path = path;
        this.color = color;
        this.icon = icon;
    }

    addLocation(location: GeoLocation){
        this.path.push(location);
    }
}

export class MarkerInfo{
    iconUrl: string;
    title: string;
    label: string;
    location: GeoLocation;
    link: string;

    constructor(location: GeoLocation, icon: string, title: string, label: string, link: string){
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.location = location;
        this.link = link;
    }
}