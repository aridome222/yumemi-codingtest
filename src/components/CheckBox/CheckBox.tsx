'use client';

import React from 'react';

export type CheckBoxProps = {
    // 表示ラベル
    label: string;
    // チェックされているかどうか
    checked: boolean;
    // チェック状態が変更されたときに呼ばれる関数
    onChange: (checked: boolean) => void;
};

// 汎用チェックボックスコンポーネント
export const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
    return (
        <label className='flex items-center'>
            <input
                type='checkbox'
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className='ml-2'>{label}</span>
        </label>
    );
};
