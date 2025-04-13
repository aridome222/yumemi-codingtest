import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Home from '../src/app/page';

const page = render(<Home />);

test('ページに「都道府県別の総人口推移グラフ」が正しく表示されている', () => {
    expect(
        page.getByRole('heading', {
            level: 1,
            name: '都道府県別の総人口推移グラフ',
        }),
    ).toBeDefined();
});
