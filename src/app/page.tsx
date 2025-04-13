'use client';

import { useEffect, useState } from 'react';

import type { PrefectureData } from '@/types/prefecture/prefectureData';
import { fetchPrefectures } from '@/utils/prefecture/fetchPrefectures';

export default function Home() {
    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const loadPrefectures = async () => {
        const { data, error } = await fetchPrefectures();
        if (error) {
            setPrefectures([]);
            setError(error);
        } else {
            setPrefectures(data!);
            setError(null);
        }
    };

    // 選択された都道府県コードを selectedPrefectures に追加する
    const handleCheckboxChange = (prefCode: number, isChecked: boolean) => {
        if (isChecked) {
            // 選択に追加
            setSelectedPrefectures([...selectedPrefectures, prefCode]);
        } else {
            // 選択から除外
            setSelectedPrefectures(
                selectedPrefectures.filter((code) => code !== prefCode),
            );
        }
    };

    useEffect(() => {
        loadPrefectures();
    }, []);

    return (
        <>
            {/* ヘッダー */}
            <h1 className='m-6 flex items-center justify-center text-2xl font-bold'>
                都道府県別の総人口推移グラフ
            </h1>

            {/* 都道府県一覧データの取得に失敗したときのエラーメッセージ */}
            {error && <p className='m-3 text-red-500'>エラー: {error}</p>}

            {/* チェックボックス */}
            <div className='mt-12 ml-18 grid grid-cols-2 gap-x-6 gap-y-4 sm:ml-24 sm:grid-cols-3 md:ml-24 md:grid-cols-4 lg:ml-20 lg:grid-cols-6'>
                {prefectures.map((pref) => (
                    <label key={pref.prefCode}>
                        <input
                            type='checkbox'
                            value={pref.prefCode}
                            checked={selectedPrefectures.includes(pref.prefCode)}
                            onChange={(e) =>
                                handleCheckboxChange(pref.prefCode, e.target.checked)
                            }
                        />
                        <span className='ml-2'>{pref.prefName}</span>
                    </label>
                ))}
            </div>
        </>
    );
}
