import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import ModalSuccess from './modal-success';

describe('modal success', () => {
  it('shoud render correctly', () => {
    render(<ModalSuccess isActive setIsShowModalSuccess={() => undefined} />);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
