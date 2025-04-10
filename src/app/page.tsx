'use client';

export default function Home() {
    return (
        <>
            <h1 className='mt-6 ml-3'>都道府県別の総人口推移グラフを表示する</h1>
            <button
                type='button'
                className='rounded bg-blue-500 py-2 pr-2 m-6 text-xl font-bold text-white'
                onClick={() => console.log('clicked')}
            >
                「都道府県一覧」取得
            </button>
        </>
    );
}
