'use client';

import React from 'react';

export type RadioButtonProps = {
    // ラベルに表示する文字列
    label: string;
    // 現在選択されているかどうか
    checked: boolean;
    // ラジオボタンが選択されたときに呼ばれる関数
    onChange: () => void;
};

export const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange }) => {
    return (
        <label className='flex items-center gap-1'>
            <input type='radio' checked={checked} onChange={onChange} />
            {label}
        </label>
    );
};
