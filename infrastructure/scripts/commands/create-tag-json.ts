import { faker } from '@faker-js/faker';

export const create_tag_json = (): void => {
  const tag = {
    tag_name: faker.lorem.word(),
    tag_color: faker.internet.color(),
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(tag, null, 2));
};
