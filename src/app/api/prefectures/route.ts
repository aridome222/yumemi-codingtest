export const dynamic = 'force-static';

import { NextResponse } from 'next/server';

import type {
    PrefectureResponce,
    PrefectureData,
} from '@/types/prefecture/prefectureData';

/**
 * 都道府県一覧データ取得API
 *
 * 成功時: 都道府県一覧データ
 * 失敗時: エラーメッセージ と エラー種別 と エラーコード
 *
 * 外部API（RESAS）へのリクエストを行い、整形済みのデータを返す。
 */
export async function GET(): Promise<NextResponse> {
    const apiUrl = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

    if (!apiUrl || !apiKey) {
        return NextResponse.json(
            {
                error: 'APIのURL、または、APIキーが設定されていません。',
                type: 'missing_env',
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
                    error: '都道府県一覧データの取得に失敗しました。',
                    type: 'response_error',
                },
                { status: res.status },
            );
        }

        const prefectureResponce: PrefectureResponce = await res.json();
        const prefectures: PrefectureData[] = prefectureResponce.result;
        // { prefectures: [...] } というJSONを含むレスポンスを返す
        return NextResponse.json({ prefectures });
    } catch (error) {
        console.error(`${error}: 都道府県一覧データ取得時エラー`);
        return NextResponse.json(
            {
                error: '都道府県一覧データの取得時にエラーが発生しました。ネットワーク接続を確認してください。',
                type: 'resas_api_fetch_failed',
            },
            { status: 500 },
        );
    }
}