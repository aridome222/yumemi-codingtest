'use client';

import { useEffect, useState } from 'react';
import type { PrefectureData } from '@/types/prefecture/prefectureData';

export default function Home() {
    const url = process.env.NEXT_PUBLIC_RESAS_API_URL || '';
    const apiKey = process.env.NEXT_PUBLIC_RESAS_API_KEY || '';

    if (!url || !apiKey) {
        throw new Error('APIのURL、または、APIキーが設定されていません');
    }

    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (prefectures.length === 47) {
            console.log('都道府県一覧データを取得できました:', prefectures);
        }
    }, [prefectures]);

    const fetchPrefectures = async () => {
        try {
            const res = await fetch(`${url}/api/v1/prefectures`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey,
                },
            });

            if (!res.ok) {
                throw new Error(
                    `都道府県一覧データの取得に失敗しました。status code: ${res.status}`,
                );
            }

            const data: PrefectureResponce = await res.json();
            setPrefectures(data.result);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                console.error('都道府県一覧データ取得時エラー:', error.message);
                setError(error.message);
            } else {
                console.error('不明なエラーが発生しました');
                setError('不明なエラーが発生しました');
            }
        }
    };

    return (
        <>
            <h1 className='mt-6 ml-3'>都道府県別の総人口推移グラフを表示する</h1>
            <button
                type='button'
                className='m-6 rounded bg-blue-500 py-2 pr-2 text-xl font-bold text-white'
                onClick={fetchPrefectures}
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
