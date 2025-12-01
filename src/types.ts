export type Upgrade = {
  i:number,
  sn:"string",
  name: string,
  rarity: number,
  tier: number,
  cooldown?: number,
  [key: string]: commonTypes,
}


export type commonTypes = string | boolean | undefined | number;

export type Program = {
    stages:Stage[]
}

export type Stage = CMD[]

export type CMD =
    | { type: "rule", data: Rule }
    | { type: "stage", data: undefined }
    | { type: "alias", data: Alias }
    | { type: "return", data: undefined }


export type Rule = {
    filters?: Array<Filter>;
    actions?: Array<Action>;
}
export type SUNFilter = {
    filterType: "sun"
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
    filterType: "lun";
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
