import type { PopulationCompositionPerYear } from '@/types/population/populationData';

const errorMessages: Record<string, string> = {
    missing_env: 'APIキーまたはURLの環境変数が設定されていません。',
    missing_param: 'prefCode が未定義のため、人口構成データを取得できません。',
    bad_request: 'APIに必要なパラメータが正しく設定されていません。',
    forbidden: 'APIキーが存在しないか無効です。',
    not_found: '指定されたURLに対応するAPIが存在しません。',
    server_error: '外部APIサーバー側で問題が発生しています。',
    resas_api_population_fetch_failed:
        '人口構成データの取得時にネットワークエラーが発生しました。',
    internal_server_error: 'サーバーに問題が発生しています。',
    unknown_error: '不明なエラーが発生しました。',
};

/**
 * 人口構成データ取得用のAPI呼び出し関数
 *
 * 返り値
 * - 成功時: 人口構成データ と null
 * - 失敗時: null と エラーメッセージ
 *
 * 概要
 * - 自前のAPI（/api/population）にリクエストし、整形済みの人口構成データを取得する。
 * - 人口構成データ取得APIから返された `type` に基づいて、UIで表示可能な日本語のエラーメッセージを返す。
 * - ネットワークエラーなどでリクエストが失敗した場合もエラーメッセージを返す。
 */
export async function fetchPopulation(prefCode: string): Promise<{
    data: PopulationCompositionPerYear | null;
    error: string | null;
}> {
    try {
        const response = await fetch(`/api/population?prefCode=${prefCode}`);
        // 人口構成データ
        const resJson = await response.json();

        if (!response.ok) {
            const errorType: string = resJson.type;
            const errorMessage: string = resJson.error;

            console.error(`${errorType}: ${errorMessage}`);
            return {
                data: null,
                error: errorMessages[errorType] || errorMessages.unknown_error,
            };
        }
        
        const populationCompositionPerYear: PopulationCompositionPerYear = resJson.populationCompositionPerYear;
        return { data: populationCompositionPerYear, error: null };
    } catch {
        // APIリクエストに失敗、または、サーバーが機能していない
        console.error(errorMessages.internal_server_error);
        return {
            data: null,
            error: errorMessages.internal_server_error,
        };
    }
}
