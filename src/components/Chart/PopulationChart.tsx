'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

import { PrefectureCheckBoxList } from '@/components/List/PrefectureCheckBoxList';
import { PopulationClassRadioButton } from '@/components/RadioButton/PopulationClassRadioButton';
import { PopulationCompositionPerYear } from '@/types/population/populationData';
import type { PrefectureData } from '@/types/prefecture/prefectureData';
import { fetchPopulation } from '@/utils/population/fetchPopulation';
import { fetchPrefectures } from '@/utils/prefecture/fetchPrefectures';

export const PopulationChart = () => {
    // 都道府県一覧データを保持（チェックボックス生成用）
    const [prefectures, setPrefectures] = useState<PrefectureData[]>([]);

    // 都道府県コードをキーにして、人口構成データをMapで保存
    const [populationDataMap, setPopulationDataMap] = useState<
        Map<number, PopulationCompositionPerYear>
    >(new Map());

    // 現在チェックされている都道府県コードの一覧
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

    // エラーメッセージ表示用
    const [error, setError] = useState<string | null>(null);

    // 表示する人口区分ラベル（総人口／年少人口／生産年齢人口／老年人口）
    const [selectedPopulationClassLabel, setSelectedPopulationClassLabel] = useState<
        '総人口' | '年少人口' | '生産年齢人口' | '老年人口'
    >('総人口');

    // 都道府県コードをキーにして、都道府県名をMapで保存
    const prefectureMap = new Map(prefectures.map((p) => [p.prefCode, p.prefName]));

    // 都道府県一覧データをAPIから取得
    const loadPrefectures = async () => {
        const { data, error } = await fetchPrefectures();

        if (error) {
            setPrefectures([]);
            setError(error);
        }

        if (data) {
            setPrefectures(data);
            setError(null);
        }
    };

    // 指定した都道府県コードの人口構成データをAPIから取得してMapに保存
    const loadPopulation = async (prefCode: number) => {
        const { data, error } = await fetchPopulation(prefCode.toString());

        if (error) {
            setError(error);
        }

        if (data) {
            // prev (前回の populationDataMap の値) を受け取って、安全に保存
            setPopulationDataMap((prev) => new Map(prev.set(prefCode, data)));
            setError(null);
        }
    };

    // チェックボックスのチェック/アンチェック時に呼ばれる処理
    const handleCheckboxChange = (prefCode: number, isChecked: boolean) => {
        if (isChecked) {
            // チェックされた場合は追加
            setSelectedPrefectures([...selectedPrefectures, prefCode]);
            // まだ人口データを取得していなければAPIを叩く
            if (!populationDataMap.has(prefCode)) {
                loadPopulation(prefCode);
            }
        } else {
            // チェックされた場合は追加
            setSelectedPrefectures(
                selectedPrefectures.filter((code) => code !== prefCode),
            );
        }
    };

    // 初回マウント時に都道府県一覧を取得
    useEffect(() => {
        loadPrefectures();
    }, []);

    // Highchartsの設定（都道府県ごとの折れ線グラフ）
    const chartOptions = {
        // グラフのタイトル
        title: {
            text: `都道府県別 ${selectedPopulationClassLabel} の推移`,
        },
        // X軸のラベル
        xAxis: {
            title: { text: '年度' },
            // 選択された人口区分に応じたX軸の目盛りを取得
            categories: [...populationDataMap.values()].flatMap(
                (d) =>
                    d.data
                        .find((p) => p.label === selectedPopulationClassLabel)
                        ?.data.map((e) => e.year) || [],
            ),
        },
        // Y軸のラベル
        yAxis: {
            title: { text: '人口数' },
            labels: {
                // カンマ区切り表示
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                    return this.value.toLocaleString();
                },
            },
        },
        // 各都道府県ごとの人口推移折れ線グラフの作成処理
        series: selectedPrefectures
            .map((prefCode) => {
                const populationData = populationDataMap.get(prefCode);
                // データがまだない場合はスキップ
                if (!populationData) return null;

                // 選択された人口区分のデータだけ抽出
                const totalPopulation = populationData.data.find(
                    (d) => d.label === selectedPopulationClassLabel,
                );
                if (!totalPopulation) return null;

                // グラフに渡す人口の配列だけ取り出す
                const data = totalPopulation.data.map((d) => d.value);

                // 都道府県名をMapから取得
                const name = prefectureMap.get(prefCode);

                // Highcharts用に{name, data, type: 'line'}の形で返す
                return { name, data, type: 'line' as const };
            })
            .filter((s) => s !== null), // nullのもの（データ未取得）は除外
    };

    return (
        <>
            {/* 都道府県一覧データの取得に失敗したときのエラーメッセージ */}
            {error && <p className='m-3 text-red-500'>エラー: {error}</p>}

            {/* 人口区分切り替え用ラジオボタン */}
            <PopulationClassRadioButton
                selectedLabel={selectedPopulationClassLabel}
                onChange={setSelectedPopulationClassLabel}
            />

            {/* 都道府県のチェックボックスリスト */}
            <PrefectureCheckBoxList
                prefectures={prefectures}
                selectedPrefectures={selectedPrefectures}
                onChange={handleCheckboxChange}
            />

            {/* 人口推移グラフ */}
            <div className='mx-6 mt-12'>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
        </>
    );
};
