'use client';

import React from 'react';

import type { PrefectureData } from '@/types/prefecture/prefectureData';

import { CheckBox } from '../CheckBox/CheckBox';

export type PrefectureCheckBoxListProps = {
    // チェックボックスに表示する都道府県一覧
    prefectures: PrefectureData[];
    // 現在チェックされている都道府県コード一覧
    selectedPrefectures: number[];
    // チェックの変更時に呼ばれる関数
    onChange: (prefCode: number, checked: boolean) => void;
};

export const PrefectureCheckBoxList: React.FC<PrefectureCheckBoxListProps> = ({
    prefectures,
    selectedPrefectures,
    onChange,
}) => {
    return (
        <div className='mt-12 ml-18 grid grid-cols-2 gap-x-6 gap-y-4 sm:ml-24 sm:grid-cols-3 md:ml-24 md:grid-cols-4 lg:ml-20 lg:grid-cols-6'>
            {prefectures.map((pref) => (
                <CheckBox
                    key={pref.prefCode}
                    label={pref.prefName}
                    checked={selectedPrefectures.includes(pref.prefCode)}
                    onChange={(checked) => onChange(pref.prefCode, checked)}
                />
            ))}
        </div>
    );
};
