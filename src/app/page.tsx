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
        if (prefectures.length === 47) {
            console.log('都道府県一覧データを取得できました:', prefectures);
        }
    }, []);

    return (
        <>
            {/* ヘッダー */}
            <h1 className='m-6 text-3xl font-bold'>都道府県別の総人口推移グラフ</h1>

            {/* 都道府県一覧データの取得に失敗したときのエラーメッセージ */}
            {error && <p className='m-3 text-red-500'>エラー: {error}</p>}

            {/* チェックボックス */}
            <div className='grid grid-cols-3 gap-4 ml-6'>
                {prefectures.map((pref) => (
                    <label key={pref.prefCode} className='flex items-center'>
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
