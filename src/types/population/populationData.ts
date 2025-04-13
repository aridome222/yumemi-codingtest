export type PopulationData = {
    year: number;
    value: number;
    rate?: number;
};

export type PopulationCompositionData = {
    label: string;
    data: PopulationData[];
};

export type PopulationCompositionPerYear = {
    boundaryYear: number;
    data: PopulationCompositionData[];
};

export type PopulationCompositionPerYearResponce = {
    message: string | null;
    result: PopulationCompositionPerYear;
};
