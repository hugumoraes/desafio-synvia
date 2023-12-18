import { faker } from '@faker-js/faker';

export const create_task_json = (): void => {
  const task = {
    person_id: 1,
    task_title: faker.lorem.words(3),
    task_description: faker.lorem.paragraph(),
    task_status_id: 1,
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(task, null, 2));
};
