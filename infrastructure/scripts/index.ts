/* ---------- External ---------- */
import inquirer from 'inquirer';

/* ---------- Utils ---------- */
import { logger } from '../src/common/utils/logs';

/* ---------- Commands ---------- */
import { create_task_json } from './commands/create-task-json';
import { create_tag_json } from './commands/create-tag-json';

/* ---------- Scripts ---------- */

const main = async (): Promise<void> => {
  const { command } = await inquirer.prompt([
    {
      message: 'Select the command you want to run:',
      type: 'list',
      name: 'command',
      choices: [
        {
          name: 'Create a task JSON',
          value: 'create-task-json',
        },
        {
          name: 'Create a tag JSON',
          value: 'create-tag-json',
        },
      ],
    },
  ]);

  switch (command) {
    case 'create-task-json':
      create_task_json();
      break;

    case 'create-tag-json':
      create_tag_json();
      break;

    default:
      logger.error('Command not found.');
      process.exit(1);
  }
};

(async () => {
  await main();
})().catch(error => {
  logger.warn(error);

  process.exit(1);
});
