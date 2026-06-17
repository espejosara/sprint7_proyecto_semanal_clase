import { jest } from '@jest/globals';

const mockSort = jest.fn();
const mockFind = jest.fn().mockReturnValue({ sort: mockSort });
const mockSave = jest.fn();

jest.unstable_mockModule('../../models/review.model.js', () => {
  return {
    default: class ReviewMock {
      constructor(data) {
        Object.assign(this, data);
        this.save = mockSave;
      }
      static find = mockFind;
    }
  };
});

const { getReviewsByProductId, createReview } = await import('../../services/reviews.service.js');
const { default: Review } = await import('../../models/review.model.js');

describe('Reviews Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    it('debería instanciar el modelo y guardar una nueva review', async () => {
      mockSave.mockResolvedValue(true);

      await createReview('prod-1', 'user-1', 5, '¡Excelente producto!');

      expect(mockSave).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReviewsByProductId', () => {
    it('debería devolver las reviews de un producto ordenadas por fecha', async () => {
      const fakeReviews = [{ id: '1', rating: 5 }, { id: '2', rating: 4 }];
      mockSort.mockResolvedValue(fakeReviews);

      const result = await getReviewsByProductId('prod-1');

      expect(Review.find).toHaveBeenCalledWith({ productId: 'prod-1' });
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toEqual(fakeReviews);
    });
  });
});