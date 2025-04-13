export type PrefectureData = {
    prefCode: number;
    prefName: string;
};

export type PrefectureResponce = {
    message: string | null;
    result: PrefectureData[];
};
