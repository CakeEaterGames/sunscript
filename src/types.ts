export type commonTypes = string | boolean | undefined | number;

export type Rule = {
    filters?: Array<Filter>;
    actions?: Array<Action>;
    alias?: Alias;
    pp?: boolean;
    return?: boolean;
}
export type SUNFilter = {
    type: "sun"
    negative?: boolean;
    loaded?: boolean;
    ready?: boolean;
    alias?: string;
    tier?: number;
    rarity?: number;
    value?: range | commonTypes;
    [key: string]: range | commonTypes;
}
export type LUNFilter = {
    type: "lun";
    negative?: boolean;
    _best?: number;
    _worst?: number;
    [key: string]: range | commonTypes;
}
export type Filter = SUNFilter | LUNFilter;

export type Action = {
    k: string,
    v: commonTypes,
}
export type Alias = {
    k: string,
    v: string,
}

export type range = {
    type: "range",
    min?: number,
    max?: number
}
