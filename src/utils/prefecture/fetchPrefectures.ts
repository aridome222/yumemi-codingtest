import type { PrefectureData } from '@/types/prefecture/prefectureData';

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