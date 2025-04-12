'use client';

import { useEffect, useState } from 'react';

import type { PrefectureData } from '@/types/prefecture/prefectureData';

export default function Home() {
    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function getPrefectures() {
        try {
            const res = await fetch('/api/prefectures');

            if (!res.ok) {
                const { error } = await res.json();
                setError(error);
                return;
            }

            const resJson = await res.json();
            const prefectures: PrefectureData[] = resJson.prefectures;
            setPrefectures(prefectures);
        } catch (error) {
            setError('通信に失敗しました。ネットワーク接続を確認してください。');
        }
    }

    useEffect(() => {
        if (prefectures.length === 47) {
            console.log('都道府県一覧データを取得できました:', prefectures);
        }
    }, [prefectures]);

    return (
        <>
            <h1 className='mt-6 ml-3'>都道府県別の総人口推移グラフを表示する</h1>
            <button
                type='button'
                className='m-6 rounded bg-blue-500 py-2 pr-2 text-xl font-bold text-white'
                onClick={getPrefectures}
            >
                「都道府県一覧」取得
            </button>

            {error && <p className='m-3 text-red-500'>エラー: {error}</p>}

            <p className='ml-6'>{prefectures.length} 都道府県</p>
            <ul className='ml-12 list-disc'>
                {prefectures.map((pref) => (
                    <li key={pref.prefCode}>{pref.prefName}</li>
                ))}
            </ul>
        </>
    );
}
