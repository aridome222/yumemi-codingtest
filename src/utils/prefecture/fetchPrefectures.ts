import type { PrefectureData } from '@/types/prefecture/prefectureData';

const errorMessages: Record<string, string> = {
    missing_env: 'APIキーまたはURLの環境変数が設定されていません。',
    bad_request: 'APIに必要なパラメータが正しく設定されていません。',
    forbidden: 'APIキーが存在しないか無効です。',
    not_found: '指定されたURLに対応するAPIが存在しません。',
    server_error: '外部APIサーバー側で問題が発生しています。',
    resas_api_fetch_failed:
        '都道府県一覧データの取得時にネットワークエラーが発生しました。',
    internal_server_error: 'サーバーに問題が発生しています。',
    unknown_error: '不明なエラーが発生しました。',
};

/**
 * 都道府県一覧データ取得用のAPI呼び出し関数
 *
 * 返り値
 * - 成功時: 都道府県一覧データ と null
 * - 失敗時: null と エラーメッセージ
 *
 * 概要
 * - 自前のAPI（/api/prefectures）にリクエストし、整形済みの都道府県一覧データを取得する。
 * - 都道府県一覧データ取得APIから返された `type` に基づいて、UIで表示可能な日本語のエラーメッセージを返す。
 * - ネットワークエラーなどでリクエストが失敗した場合もエラーメッセージを返す。
 */
export async function fetchPrefectures(): Promise<{
    data: PrefectureData[] | null;
    error: string | null;
}> {
    try {
        const res = await fetch('/api/prefectures');
        const resJson = await res.json();

        if (!res.ok) {
            const errorType: string = resJson.type;
            const errorMessage: string = resJson.error;

            console.error(`${errorType}: ${errorMessage}`);
            return {
                data: null,
                error: errorMessages[errorType] || errorMessages.unknown_error,
            };
        }

        const prefectures: PrefectureData[] = resJson.prefectures;
        return { data: prefectures, error: null };
    } catch {
        // APIリクエストに失敗、または、サーバーが機能していない
        console.error(errorMessages.internal_server_error);
        return {
            data: null,
            error: errorMessages.internal_server_error,
        };
    }
}
