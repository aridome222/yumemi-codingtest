import type { PrefectureData } from '@/types/prefecture/prefectureData';

export async function fetchPrefectures(): Promise<{
    data: PrefectureData[] | null;
    error: string | null;
}> {
    try {
        const res = await fetch('/api/prefectures');

        if (!res.ok) {
            return {
                data: null,
                error: '都道府県一覧データの取得に失敗しました。',
            };
        }

        const resJson = await res.json();
        const prefectures: PrefectureData[] = resJson.prefectures;
        return { data: prefectures, error: null };
    } catch {
        // ローカルサーバー、または、Next.js サーバーが機能していない場合
        return { data: null, error: 'サーバーが機能していません。（開発者へ連絡してください）' };
    }
}