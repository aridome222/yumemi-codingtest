export const dynamic = 'force-static';

import { NextResponse } from 'next/server';

import type {
    PrefectureResponce,
    PrefectureData,
} from '@/types/prefecture/prefectureData';

/**
 * 都道府県一覧データ取得API
 *
 * 成功時: { prefectures: PrefectureData[] }
 * 失敗時: { error: string } と HTTPステータスコード（例: 400, 401, 500 など）
 *
 * 外部API（RESAS）へのリクエストを行い、整形済みのデータを返す。
 */
export async function GET(): Promise<NextResponse> {
    const apiUrl = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

    if (!apiUrl || !apiKey) {
        return NextResponse.json(
            {
                error: 'APIのURL、または、APIキーが設定されていません',
            },
            { status: 500 },
        );
    }

    try {
        const res = await fetch(`${apiUrl}/api/v1/prefectures`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: `${res.statusText}: 都道府県一覧データの取得に失敗しました。`,
                },
                { status: res.status },
            );
        }

        const prefectureResponce: PrefectureResponce = await res.json();
        const prefectures: PrefectureData[] = prefectureResponce.result;
        // { prefectures: [...] } というJSONを含むレスポンスを返す
        return NextResponse.json({ prefectures });
    } catch (error) {
        // fetchが失敗した時の処理
        return NextResponse.json(
            {
                error: `${error}: 都道府県一覧データの取得時にエラーが発生しました`,
            },
            { status: 500 },
        );
    }
}
