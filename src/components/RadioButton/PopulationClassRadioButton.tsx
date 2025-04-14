'use client';

import React from 'react';

import { RadioButton } from './RadioButton';

export type PopulationClassLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export type PopulationClassRadioProps = {
    // 現在選択されている人口区分ラベル
    selectedLabel: PopulationClassLabel;
    // 選択が変更されたときに呼ばれるハンドラ関数
    onChange: (label: PopulationClassLabel) => void;
};

const labels: PopulationClassLabel[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

export const PopulationClassRadioButton: React.FC<PopulationClassRadioProps> = ({
    selectedLabel,
    onChange,
}) => {
    return (
        <div className='m-4 flex flex-wrap items-center justify-center gap-4'>
            {labels.map((label) => (
                <RadioButton
                    key={label}
                    label={label}
                    checked={selectedLabel === label}
                    onChange={() => onChange(label)}
                />
            ))}
        </div>
    );
};
