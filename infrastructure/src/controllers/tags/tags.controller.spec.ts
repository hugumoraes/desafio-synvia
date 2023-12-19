import request from 'supertest';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { tags_controller } from './tags.controller';
import { tags_repository } from '../../repositories/tags/tags.repository';

jest.mock('../../repositories/tags/tags.repository.ts');

describe('Tags Controller', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());

    app.get('/tags/:id', tags_controller.get_tag_by_id);
    app.get('/tags', tags_controller.get_all_tags);
    app.post('/tags', tags_controller.create_tag);
    app.delete('/tags/:id', tags_controller.delete_tag);
    app.put('/tags/:id', tags_controller.update_tag);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tags', () => {
    it('should return all tags', async () => {
      const mockTags = [
        { tag_id: 1, name: 'Example Tag' },
        { tag_id: 2, name: 'Another Tag' },
      ];
      (tags_repository.get_all_tags as jest.Mock).mockResolvedValue(mockTags);

      const response = await request(app).get('/tags');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ tags: mockTags });
      expect(tags_repository.get_all_tags).toHaveBeenCalled();
    });
  });

  describe('GET /tags/:id', () => {
    it('should return a tag for a valid ID', async () => {
      const mockTag = { id: 1, name: 'Example Tag' };
      (tags_repository.get_tag_by_id as jest.Mock).mockResolvedValue(mockTag);

      const response = await request(app).get('/tags/1');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ tag: mockTag });
      expect(tags_repository.get_tag_by_id).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /tags', () => {
    it('should create a new tag', async () => {
      const newTag = { tag_name: 'New Tag', tag_color: 'blue' };
      const createdTag = { ...newTag, id: 2 };
      (tags_repository.create_tag as jest.Mock).mockResolvedValue(createdTag);

      const response = await request(app).post('/tags').send(newTag);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ tag: createdTag });
      expect(tags_repository.create_tag).toHaveBeenCalledWith(newTag);
    });
  });

  describe('DELETE /tags/:id', () => {
    it('should delete a tag', async () => {
      const mockTag = { tag_id: 1, tag_name: 'Example Tag' };
      (tags_repository.get_tag_by_id as jest.Mock).mockResolvedValue(mockTag);
      (tags_repository.delete_tag as jest.Mock).mockResolvedValue({
        tag: mockTag,
      });

      const response = await request(app).delete('/tags/1');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ tag: mockTag });
      expect(tags_repository.delete_tag).toHaveBeenCalledWith(mockTag);
    });
  });

  describe('PUT /tags/:id', () => {
    it('should update a tag', async () => {
      const mockTag = { tag_id: 1, tag_name: 'Example Tag' };
      const updatedTag = { ...mockTag, tag_name: 'Updated Tag' };
      (tags_repository.get_tag_by_id as jest.Mock).mockResolvedValue(mockTag);
      (tags_repository.update_tag as jest.Mock).mockResolvedValue(updatedTag);

      const response = await request(app).put('/tags/1').send(updatedTag);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ tag: updatedTag });
      expect(tags_repository.update_tag).toHaveBeenCalledWith(mockTag, {
        tag_name: updatedTag.tag_name,
      });
    });
  });
});
