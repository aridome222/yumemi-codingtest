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

export async function fetchPrefectures(): Promise<{
    data: PrefectureData[] | null;
    error: string | null;
}> {
    try {
        const res = await fetch('/api/prefectures');

        if (!res.ok) {
            const resJson = await res.json();
            const type = resJson.type;
            const errorText = resJson.error;
            if (type === 'missing_env') {
                return {
                    data: null,
                    error: errorText,
                };
            } else if (type === 'response_error') {
                return {
                    data: null,
                    error: errorText,
                };
            } else if (type === 'resas_api_fetch_failed') {
                return {
                    data: null,
                    error: errorText,
                };
            }
        }

        const resJson = await res.json();
        const prefectures: PrefectureData[] = resJson.prefectures;
        return { data: prefectures, error: null };
    } catch {
        // ローカルサーバー、または、Next.js サーバーが機能していない場合
        return { data: null, error: 'サーバーが機能していません。（開発者へ連絡してください）' };
    }
}