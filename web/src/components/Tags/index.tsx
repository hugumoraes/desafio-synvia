import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { Header } from '_components/UI/Header';
import { Navbar } from '_components/UI/Navbar';

import styles from './styles.module.scss';

import { api } from '_services';

interface Tag {
  tag_id: number;
  tag_name: string;
  tag_color: string;
  created_at?: string;
  updated_at?: string;
}

interface GetAllTagsResponse {
  tags: Tag[];
}

interface CreateTagResponse {
  tag: Tag;
}

export const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag>({
    tag_id: 0,
    tag_color: '',
    tag_name: '',
  });

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    setTag({ ...tag, [name]: value });
  };

  const handle_add_new_tag = async (): Promise<void> => {
    try {
      const { data } = await api.post<CreateTagResponse>('/tag', {
        tag_name: tag.tag_name,
        tag_color: tag.tag_color,
      });

      const { tag: created_tag } = data;

      setTags([...tags, created_tag]);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_delete_tag = async (tag_id: number): Promise<void> => {
    try {
      await api.delete(`/tag/${tag_id}`);

      const new_tags = tags.filter(tag => tag.tag_id !== tag_id);

      setTags(new_tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await api.get<GetAllTagsResponse>('/tag');

        const { tags } = data;

        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Navbar />

        <div className={styles.tags}>
          <h1>Tags</h1>

          <div className={styles.input_row}>
            <input
              type="text"
              name="tag_name"
              placeholder="Tag name"
              onChange={handle_input_change}
              value={tag.tag_name}
            />

            <input
              type="text"
              name="tag_color"
              placeholder="Tag color"
              onChange={handle_input_change}
              value={tag.tag_color}
            />

            <button type="button" onClick={handle_add_new_tag}>
              Add
            </button>
          </div>

          <ul>
            {tags.map(tag => (
              <li key={tag.tag_id} style={{ background: tag.tag_color }}>
                <span>{tag.tag_name}</span>

                <button
                  type="button"
                  onClick={async () => {
                    await handle_delete_tag(tag.tag_id);
                  }}
                >
                  <FaRegTrashAlt className={styles.delete_button} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
