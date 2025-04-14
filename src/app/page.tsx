import { PopulationChart } from '@/components/Chart/PopulationChart';

export default function Home() {
    return (
        <>
            {/* ヘッダー */}
            <h1 className='m-6 flex items-center justify-center text-2xl font-bold'>
                都道府県別の総人口推移グラフ
            </h1>
            {/* 都道府県別の人口推移グラフ */}
            <PopulationChart />
        </>
    );
}
