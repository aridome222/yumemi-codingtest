import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPrefectures } from '@/utils/prefecture/fetchPrefectures';
import { mockPrefectureData } from '../__mocks__/prefecture/prefectureData';

describe('fetchPrefectures 関数の単体テスト', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('正常に都道府県一覧データを取得できる', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ prefectures: mockPrefectureData }),
        });

        const result = await fetchPrefectures();

        expect(result.data).toEqual(mockPrefectureData);
        expect(result.error).toBeNull();
    });

    it('エラータイプに対応したエラーメッセージが返る（例: missing_env）', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                type: 'missing_env',
                error: 'APIキーまたはURLの環境変数が設定されていません。',
            }),
        });

        const result = await fetchPrefectures();

        expect(result.data).toBeNull();
        expect(result.error).toBe('APIキーまたはURLの環境変数が設定されていません。');
    });

    it('未知のエラータイプが来た場合、unknown_errorとして処理される', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                type: 'unexpected_type',
                error: '不明なエラーが発生しました。',
            }),
        });

        const result = await fetchPrefectures();

        expect(result.data).toBeNull();
        expect(result.error).toBe('不明なエラーが発生しました。');
    });

    it('fetch自体が失敗した場合、internal_server_errorを返す', async () => {
        global.fetch = vi
            .fn()
            .mockRejectedValue(new Error('サーバーに問題が発生しています。'));

        const result = await fetchPrefectures();

        expect(result.data).toBeNull();
        expect(result.error).toBe('サーバーに問題が発生しています。');
    });
});
