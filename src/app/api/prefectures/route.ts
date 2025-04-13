export const dynamic = 'force-static';

import { NextResponse } from 'next/server';

import type {
    PrefectureResponce,
    PrefectureData,
} from '@/types/prefecture/prefectureData';

const errorType: Record<number, string> = {
    400: 'bad_request',
    403: 'forbidden',
    404: 'not_found',
    500: 'server_error',
};

/**
 * 都道府県一覧データ取得API
 *
 * 返り値
 * - 成功時: 都道府県一覧データ
 * - 失敗時: エラー種別（errorTypeを参照）と エラーメッセージ と エラーコード
 *
 * 概要
 * - 外部API（RESAS）へのリクエストを行い、整形済みの都道府県一覧データを返す。
 * - 環境変数が未設定の場合や、外部API（RESAS）からの取得に失敗した場合にエラーを返す。
 * - ネットワークエラーなどでリクエストが失敗した場合もエラーを返す。
 * - 外部APIのエラーコードに応じて `type`（= errorType）を付加して返却する。
 */
export async function GET(): Promise<NextResponse> {
    const apiUrl = process.env.RESAS_API_URL || '';
    const apiKey = process.env.RESAS_API_KEY || '';

    if (!apiUrl || !apiKey) {
        return NextResponse.json(
            {
                type: 'missing_env',
                error: 'APIのURL、または、APIキーが設定されていません。',
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
            const matchedErrorType: string = errorType[res.status];

            return NextResponse.json(
                {
                    type: matchedErrorType,
                    error: `都道府県一覧データの取得に失敗しました。`,
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
                type: 'resas_api_fetch_failed',
                error: `都道府県一覧データの取得時にネットワークエラーが発生しました。`,
            },
            { status: 500 },
        );
    }
}
