'use client';

import { useEffect, useState } from 'react';

type PrefectureData = {
    prefCode: number;
    prefName: string;
};

type PrefectureResponce = {
    message: string;
    result: PrefectureData[];
};

export default function Home() {
    const url = process.env.NEXT_PUBLIC_RESAS_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_RESAS_API_KEY || '';

    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);

    useEffect(() => {
        console.log('都道府県一覧データを取得できました:', prefectures);
    }, [prefectures]);

    const fetchPrefectures = async () => {
        const res = await fetch(`${url}/api/v1/prefectures`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
        });

        if (!res.ok) {
            console.error(
                `都道府県一覧データの取得に失敗しました。status code: ${res.status}`,
            );
        }

        const data: PrefectureResponce = await res.json();
        setPrefectures(data.result);
    };

    return (
        <>
            <h1 className='mt-6 ml-3'>都道府県別の総人口推移グラフを表示する</h1>
            <button
                type='button'
                className='rounded bg-blue-500 py-2 pr-2 m-6 text-xl font-bold text-white'
                onClick={fetchPrefectures}
            >
                「都道府県一覧」取得
            </button>
        </>
    );
}
